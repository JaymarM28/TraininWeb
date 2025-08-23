import { Controller, Get, Post, Body, UseGuards, Request, Param, Put, Delete } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role, Difficulty } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsInt, Min } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsInt()
  @Min(1)
  duration: number; // en minutos
}

export class AddExerciseToRoutineDto {
  @IsString()
  exerciseId: string;

  @IsInt()
  @Min(1)
  sets: number;

  @IsString()
  reps: string; // "12" o "12-15" o "30 segundos"

  @IsInt()
  @Min(1)
  order: number;
}

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get()
  async findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.routinesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Post()
  async create(@Body() dto: CreateRoutineDto, @Request() req) {
    return this.routinesService.create({
      ...dto,
      createdBy: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateRoutineDto>, @Request() req) {
    // Solo permitir actualizar si es el creador o es admin
    const routine = await this.routinesService.findOne(id);
    if (!routine) {
      throw new Error('Rutina no encontrada');
    }

    // Los ADMIN pueden editar cualquier rutina, los COACH solo las suyas
    if (req.user.role !== Role.ADMIN && routine.createdBy !== req.user.id) {
      throw new Error('No tienes permisos para editar esta rutina');
    }

    return this.routinesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    // Solo permitir eliminar si es el creador o es admin
    const routine = await this.routinesService.findOne(id);
    if (!routine) {
      throw new Error('Rutina no encontrada');
    }

    // Los ADMIN pueden eliminar cualquier rutina, los COACH solo las suyas
    if (req.user.role !== Role.ADMIN && routine.createdBy !== req.user.id) {
      throw new Error('No tienes permisos para eliminar esta rutina');
    }

    return this.routinesService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Get('my/routines')
  async getMyRoutines(@Request() req) {
    return this.routinesService.findByCreator(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Post(':id/exercises')
  async addExercise(@Param('id') routineId: string, @Body() dto: AddExerciseToRoutineDto, @Request() req) {
    // Verificar permisos sobre la rutina
    const routine = await this.routinesService.findOne(routineId);
    if (!routine) {
      throw new Error('Rutina no encontrada');
    }

    if (req.user.role !== Role.ADMIN && routine.createdBy !== req.user.id) {
      throw new Error('No tienes permisos para modificar esta rutina');
    }

    return this.routinesService.addExerciseToRoutine(
      routineId,
      dto.exerciseId,
      dto.sets,
      dto.reps,
      dto.order
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Delete(':routineId/exercises/:exerciseId')
  async removeExercise(
    @Param('routineId') routineId: string,
    @Param('exerciseId') exerciseId: string,
    @Request() req
  ) {
    // Verificar permisos sobre la rutina
    const routine = await this.routinesService.findOne(routineId);
    if (!routine) {
      throw new Error('Rutina no encontrada');
    }

    if (req.user.role !== Role.ADMIN && routine.createdBy !== req.user.id) {
      throw new Error('No tienes permisos para modificar esta rutina');
    }

    return this.routinesService.removeExerciseFromRoutine(routineId, exerciseId);
  }
}