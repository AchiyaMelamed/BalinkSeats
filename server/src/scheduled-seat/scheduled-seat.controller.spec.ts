import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledSeatController } from './scheduled-seat.controller';
import { ScheduledSeatService } from './scheduled-seat.service';

describe('ScheduledSeatController', () => {
  let controller: ScheduledSeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduledSeatController],
      providers: [ScheduledSeatService],
    }).compile();

    controller = module.get<ScheduledSeatController>(ScheduledSeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
