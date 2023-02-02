import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from '../../dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.findEmployeeById(id);
  }

  @Get()
  getEmployee(
    @Query('email') email: string,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('id') id: string,
  ) {
    if (!email && !firstName && !lastName && !id) {
      return this.employeeService.findAllEmployees();
      console.error('firstName', firstName);
    }
    return this.employeeService.findEmployee({
      id,
      email,
      firstName,
      lastName,
    });
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create a new employee' })
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Delete(':id')
  deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(id);
  }

  @Delete()
  deleteEmployee(@Body('email') email: string) {
    return this.employeeService.deleteEmployee({ email });
  }
}
