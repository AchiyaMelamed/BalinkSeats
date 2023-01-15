import { PartialType } from '@nestjs/mapped-types';
import CreateScheduledSeatDto from './create-scheduled-seat.dto';

class UpdateScheduledSeatDto extends PartialType(CreateScheduledSeatDto) {}

export default UpdateScheduledSeatDto;
