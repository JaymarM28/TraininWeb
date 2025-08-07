import { Controller, Get } from '@nestjs/common';

@Controller('routines')
export class RoutinesController {
  @Get()
  findAll() {
    return [
      {
        id: '1',
        name: 'Rutina Principiante',
        description: 'Rutina básica',
        duration: 30
      }
    ];
  }
}