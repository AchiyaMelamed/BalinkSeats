import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from 'src/dto';
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
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('id') id: string,
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
}
