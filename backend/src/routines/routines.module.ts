import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';

@Module({
  providers: [RoutinesService],
  controllers: [RoutinesController]
})
export class RoutinesModule {}
