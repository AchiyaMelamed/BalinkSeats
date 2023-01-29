import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDetails | any> {
    return await this.userService.findUserById(id);
  }
}
