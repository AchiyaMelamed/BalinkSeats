import { Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  async getData() {
    return await this.appService.getData();
  }

  @Delete('data')
  async deleteAllData() {
    return await this.appService.deleteAllData();
  }
}
