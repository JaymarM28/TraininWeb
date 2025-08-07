import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

export class RegisterDto {
  email: string;
  cedula: string;
  name: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.cedula,
      registerDto.name,
      registerDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}