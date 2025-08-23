import { Controller, Get, Post, Body, UseGuards, Request, Param, Put, Delete } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '@prisma/client';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Post('create')
  async create(@Body() dto: CreateExerciseDto, @Request() req) {
    return this.exercisesService.create({
      ...dto,
      createdBy: req.user.id,
    });
  }

  @Get('getAll')
  async findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.exercisesService.findById(id);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.exercisesService.findByCategory(category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateExerciseDto>, @Request() req) {
    // Solo permitir actualizar si es el creador o es admin
    const exercise = await this.exercisesService.findById(id);
    if (!exercise) {
      throw new Error('Ejercicio no encontrado');
    }

    // Los ADMIN pueden editar cualquier ejercicio, los COACH solo los suyos
    if (req.user.role !== Role.ADMIN && exercise.createdBy !== req.user.id) {
      throw new Error('No tienes permisos para editar este ejercicio');
    }

    return this.exercisesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    // Solo permitir eliminar si es el creador o es admin
    const exercise = await this.exercisesService.findById(id);
    if (!exercise) {
      throw new Error('Ejercicio no encontrado');
    }

    // Los ADMIN pueden eliminar cualquier ejercicio, los COACH solo los suyos
    if (req.user.role !== Role.ADMIN && exercise.createdBy !== req.user.id) {
      throw new Error('No tienes permisos para eliminar este ejercicio');
    }

    return this.exercisesService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COACH)
  @Get('my/exercises')
  async getMyExercises(@Request() req) {
    return this.exercisesService.findByCreator(req.user.id);
  }
}