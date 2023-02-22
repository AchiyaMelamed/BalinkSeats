import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DATABASE_URL } from '../../constants';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL || 'mongodb://127.0.0.1:27017/seats'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
