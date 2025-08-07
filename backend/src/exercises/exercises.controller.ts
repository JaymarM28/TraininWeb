import { Controller, Get } from '@nestjs/common';

@Controller('exercises')
export class ExercisesController {
  @Get()
  findAll() {
    return [
      {
        id: '1',
        name: 'Flexiones',
        description: 'Ejercicio de pecho',
        category: 'Pecho'
      }
    ];
  }
}