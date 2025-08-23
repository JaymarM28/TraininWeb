// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request, Query, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  cedula: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  coachId?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class VerifyTokenDto {
  @IsString()
  token: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { role = Role.USER, coachId, ...userData } = registerDto;
    
    return this.authService.register(
      userData.email,
      userData.cedula,
      userData.name,
      userData.password,
      role,
      coachId,
    );
  }

  // Endpoint para que usuarios autenticados registren otros usuarios
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Post('register-user')
  async registerUser(@Request() req, @Body() registerDto: RegisterDto) {
    const { role = Role.USER, coachId, ...userData } = registerDto;
    
    // Si es un COACH creando un USER, automáticamente asignar el coachId
    const finalCoachId = req.user.role === Role.COACH && role === Role.USER 
      ? req.user.id 
      : coachId;
    
    return this.authService.register(
      userData.email,
      userData.cedula,
      userData.name,
      userData.password,
      role,
      finalCoachId,
      req.user.id // createdBy
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('verify')
  async verifyToken(@Body() verifyTokenDto: VerifyTokenDto) {
    return this.authService.verifyToken(verifyTokenDto.token);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validateToken(@Request() req) {
    return {
      valid: true,
      user: req.user,
    };
  }

  // Endpoints para gestión de usuarios por roles
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Get('users')
  async getUsers(@Request() req, @Query('role') role?: Role) {
    return this.authService.getUsersByRole(req.user.id, role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Patch('users/:id/toggle-status')
  async toggleUserStatus(@Request() req, @Param('id') targetUserId: string) {
    return this.authService.toggleUserStatus(req.user.id, targetUserId);
  }

  // Endpoint para obtener el dashboard según el rol
  @UseGuards(JwtAuthGuard)
  @Get('dashboard-route')
  async getDashboardRoute(@Request() req) {
    const { role } = req.user;
    
    const routes = {
      [Role.ADMIN]: '/admin',
      [Role.COACH]: '/coach',
      [Role.USER]: '/dashboard',
    };

    return {
      route: routes[role] || '/dashboard',
      role,
    };
  }
}