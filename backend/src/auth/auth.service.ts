import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // ✅ Ahora funciona
    private jwtService: JwtService,
  ) {}

  async register(email: string, cedula: string, name: string, password: string) {
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

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Crear usuario
    const user = await this.prisma.user.create({
      data: {
        email,
        cedula,
        name,
        password: hashedPassword,
      },
    });

    // Retornar sin la contraseña
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    // Buscar usuario por email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar JWT
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      name: user.name,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        cedula: user.cedula,
      },
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
      },
    });
  }
}