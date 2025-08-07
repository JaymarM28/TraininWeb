import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Difficulty } from '@prisma/client';

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.routine.findMany({
      include: {
        exercises: {
          include: {
            exercise: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.routine.findUnique({
      where: { id },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }
}