import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledSeatService } from './scheduled-seat.service';

describe('ScheduledSeatService', () => {
  let service: ScheduledSeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledSeatService],
    }).compile();

    service = module.get<ScheduledSeatService>(ScheduledSeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
