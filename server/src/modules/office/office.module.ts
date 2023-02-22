import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { Office, OfficeSchema } from '../../schemas';
import { DATABASE_URL } from '../../constants';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL || 'mongodb://127.0.0.1:27017/seats'),
    MongooseModule.forFeature([{ name: Office.name, schema: OfficeSchema }]),
  ],
  controllers: [OfficeController],
  providers: [OfficeService],
  exports: [OfficeService],
})
export class OfficeModule {}
