import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Difficulty } from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exercise.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      },
      orderBy: { name: 'asc' },
    });
  }

  async findByCategory(category: string) {
    return this.prisma.exercise.findMany({
      where: { category },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.exercise.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      },
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
    createdBy: string; // ✅ Ahora incluimos createdBy
  }) {
    return this.prisma.exercise.create({ 
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      },
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
    category?: string;
    difficulty?: Difficulty;
    muscleGroup?: string;
    isActive?: boolean;
  }) {
    return this.prisma.exercise.update({
      where: { id },
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      },
    });
  }

  async delete(id: string) {
    return this.prisma.exercise.delete({
      where: { id },
    });
  }

  async findByCreator(createdBy: string) {
    return this.prisma.exercise.findMany({
      where: { createdBy },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      },
      orderBy: { name: 'asc' },
    });
  }
}