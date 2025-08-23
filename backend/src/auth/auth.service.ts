// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string, 
    cedula: string, 
    name: string, 
    password: string,
    role: Role = Role.USER,
    coachId?: string,
    createdBy?: string
  ) {
    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { cedula }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('El email ya está registrado');
      }
      if (existingUser.cedula === cedula) {
        throw new ConflictException('La cédula ya está registrada');
      }
    }

    // Validar permisos de creación según el rol
    if (createdBy) {
      const creator = await this.prisma.user.findUnique({
        where: { id: createdBy }
      });

      if (!creator) {
        throw new UnauthorizedException('Creador no válido');
      }

      // Validar que el creador puede crear este tipo de usuario
      await this.validateUserCreationPermissions(creator.role, role);
    }

    // Si es un USER y tiene coachId, verificar que el coach existe
    if (role === Role.USER && coachId) {
      const coach = await this.prisma.user.findFirst({
        where: { 
          id: coachId,
          role: { in: [Role.COACH, Role.ADMIN] }
        }
      });

      if (!coach) {
        throw new ConflictException('Coach no válido');
      }
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Crear usuario
    const user = await this.prisma.user.create({
      data: {
        email,
        cedula,
        name,
        password: hashedPassword,
        role,
        coachId: role === Role.USER ? coachId : null,
        createdBy,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        cedula: true,
        isActive: true,
        coachId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Generar tokens
    const tokens = await this.generateTokens(user);

    return {
      user,
      tokens,
    };
  }

  async login(email: string, password: string) {
    // Buscar usuario por email
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        coach: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario desactivado');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Preparar datos del usuario (sin password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      cedula: user.cedula,
      isActive: user.isActive,
      coachId: user.coachId,
      coach: user.coach,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Generar tokens
    const tokens = await this.generateTokens(userData);

    return {
      user: userData,
      tokens,
    };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        cedula: true,
        isActive: true,
        coachId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.validateUser(payload.sub);
      
      if (!user || !user.isActive) {
        return { valid: false };
      }

      return { valid: true, user };
    } catch (error) {
      return { valid: false };
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.validateUser(payload.sub);
      
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const tokens = await this.generateTokens(user);
      
      return {
        user,
        tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Token de actualización inválido');
    }
  }

  async logout(userId: string) {
    // Aquí podrías implementar blacklist de tokens si es necesario
    return { message: 'Sesión cerrada exitosamente' };
  }

  // Métodos de gestión de usuarios por roles
  async getUsersByRole(requesterId: string, targetRole?: Role) {
    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId }
    });

    if (!requester) {
      throw new UnauthorizedException('Usuario no válido');
    }

    let whereClause: any = { isActive: true };

    // Filtrar según el rol del solicitante
    switch (requester.role) {
      case Role.ADMIN:
        // ADMIN puede ver todos los usuarios
        if (targetRole) {
          whereClause.role = targetRole;
        }
        break;
      
      case Role.COACH:
        // COACH solo puede ver sus usuarios (USER)
        whereClause.coachId = requesterId;
        whereClause.role = Role.USER;
        break;
      
      case Role.USER:
        // USER no puede ver otros usuarios
        throw new ForbiddenException('No tienes permisos para ver usuarios');
    }

    return this.prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        cedula: true,
        isActive: true,
        coachId: true,
        createdAt: true,
        updatedAt: true,
        coach: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async toggleUserStatus(requesterId: string, targetUserId: string) {
    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId }
    });

    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId }
    });

    if (!requester || !targetUser) {
      throw new UnauthorizedException('Usuario no válido');
    }

    // Validar permisos
    await this.validateUserManagementPermissions(requester, targetUser);

    return this.prisma.user.update({
      where: { id: targetUserId },
      data: { isActive: !targetUser.isActive },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      }
    });
  }

  // Métodos privados de validación
  private async validateUserCreationPermissions(creatorRole: Role, targetRole: Role) {
    switch (creatorRole) {
      case Role.ADMIN:
        // ADMIN puede crear cualquier tipo de usuario
        break;
      
      case Role.COACH:
        // COACH solo puede crear USER
        if (targetRole !== Role.USER) {
          throw new ForbiddenException('Los coaches solo pueden crear usuarios');
        }
        break;
      
      case Role.USER:
        // USER no puede crear usuarios
        throw new ForbiddenException('Los usuarios no pueden crear otros usuarios');
    }
  }

  private async validateUserManagementPermissions(requester: any, target: any) {
    switch (requester.role) {
      case Role.ADMIN:
        // ADMIN puede gestionar a todos
        break;
      
      case Role.COACH:
        // COACH solo puede gestionar sus usuarios
        if (target.role !== Role.USER || target.coachId !== requester.id) {
          throw new ForbiddenException('Solo puedes gestionar tus propios usuarios');
        }
        break;
      
      case Role.USER:
        // USER no puede gestionar otros usuarios
        throw new ForbiddenException('No tienes permisos para gestionar usuarios');
    }
  }

  private async generateTokens(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      name: user.name,
      coachId: user.coachId,
    };
    
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60, // 15 minutes in seconds
    };
  }
}