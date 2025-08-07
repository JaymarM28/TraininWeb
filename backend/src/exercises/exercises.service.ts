import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Difficulty } from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exercise.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findByCategory(category: string) {
    return this.prisma.exercise.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });
  }

  async create(data: {
    name: string;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
    category: string;
    difficulty: Difficulty;
    muscleGroup: string;
  }) {
    return this.prisma.exercise.create({ data });
  }
}