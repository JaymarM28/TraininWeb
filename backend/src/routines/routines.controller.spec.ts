import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesController } from './routines.controller';

describe('RoutinesController', () => {
  let controller: RoutinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutinesController],
    }).compile();

    controller = module.get<RoutinesController>(RoutinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
