import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { RoutinesModule } from './routines/routines.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
    }),
    
    // Nuestros módulos
    PrismaModule,
    AuthModule,
    ExercisesModule,
    RoutinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}