import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area, AreaSchema, Office, OfficeSchema } from '../../schemas';
import { OfficeModule } from '../office/office.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/seats'),
    MongooseModule.forFeature([
      { name: Area.name, schema: AreaSchema },
      { name: Office.name, schema: OfficeSchema },
    ]),
    OfficeModule,
  ],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
