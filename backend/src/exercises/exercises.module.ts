import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Importar AuthModule

@Module({
  imports: [AuthModule], // ✅ Importar AuthModule para acceder a JwtAuthGuard y RolesGuard
  providers: [ExercisesService],
  controllers: [ExercisesController],
  exports: [ExercisesService], // Exportar el servicio por si otros módulos lo necesitan
})
export class ExercisesModule {}