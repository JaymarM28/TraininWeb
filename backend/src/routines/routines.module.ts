import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Importar AuthModule

@Module({
  imports: [AuthModule],
  providers: [RoutinesService],
  controllers: [RoutinesController],
  exports: [RoutinesService],
})
export class RoutinesModule {}