import { Controller, Get, Post, Body } from '@nestjs/common';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Difficulty } from '@prisma/client'; 
import { ExercisesService } from './exercises.service';


export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsString()
  category: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsString()
  muscleGroup: string;
}

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