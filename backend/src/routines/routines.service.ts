// backend/src/routines/routines.service.ts (corregido)
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Difficulty } from '@prisma/client';

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.routine.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        },
        exercises: {
          include: {
            exercise: {
              include: {
                creator: {
                  select: {
                    id: true,
                    name: true,
                    role: true,
                  }
                }
              }
            },
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.routine.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        },
        exercises: {
          include: {
            exercise: {
              include: {
                creator: {
                  select: {
                    id: true,
                    name: true,
                    role: true,
                  }
                }
              }
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data: {
    name: string;
    description?: string;
    difficulty: Difficulty;
    duration: number;
    createdBy: string; // ✅ Ahora incluimos createdBy
  }) {
    return this.prisma.routine.create({
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        },
        exercises: {
          include: {
            exercise: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    difficulty?: Difficulty;
    duration?: number;
    isActive?: boolean;
  }) {
    return this.prisma.routine.update({
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
        },
        exercises: {
          include: {
            exercise: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.routine.delete({
      where: { id },
    });
  }

  async findByCreator(createdBy: string) {
    return this.prisma.routine.findMany({
      where: { createdBy },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        },
        exercises: {
          include: {
            exercise: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async addExerciseToRoutine(routineId: string, exerciseId: string, sets: number, reps: string, order: number) {
    return this.prisma.routineExercise.create({
      data: {
        routineId,
        exerciseId,
        sets,
        reps,
        order,
      },
      include: {
        exercise: true,
        routine: true,
      },
    });
  }

  async removeExerciseFromRoutine(routineId: string, exerciseId: string) {
    return this.prisma.routineExercise.deleteMany({
      where: {
        routineId,
        exerciseId,
      },
    });
  }
}