import { Module } from '@nestjs/common';

import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from '../../schemas';
import { Row, RowSchema } from '../../schemas';
import { RowModule } from '../row/row.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/seats'),
    MongooseModule.forFeature([
      { name: Seat.name, schema: SeatSchema },
      { name: Row.name, schema: RowSchema },
    ]),
    RowModule,
  ],
  controllers: [SeatController],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatModule {}
