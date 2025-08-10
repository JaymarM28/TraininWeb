import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Difficulty } from '@prisma/client';

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
