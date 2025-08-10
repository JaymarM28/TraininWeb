import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post('create')
  async create(@Body() dto: CreateExerciseDto) {
    return this.exercisesService.create(dto);
  }

  @Get('getAll')
  async findAll() {
    return this.exercisesService.findAll();
  }
}