import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RowService } from './row.service';
import { RowController } from './row.controller';
import { Area, AreaSchema, Row, RowSchema } from '../../schemas';
import { AreaModule } from '../area/area.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/seats'),
    MongooseModule.forFeature([
      { name: Row.name, schema: RowSchema },
      { name: Area.name, schema: AreaSchema },
    ]),
    AreaModule,
  ],
  controllers: [RowController],
  providers: [RowService],
  exports: [RowService],
})
export class RowModule {}
