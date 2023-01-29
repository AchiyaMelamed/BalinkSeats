import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Employee, EmployeeDocument } from 'src/schemas';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/dto';
import handleInvalidValueError from 'utils/errorHandling/handleGetById';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async findAllEmployees() {
    return this.employeeModel.find().exec();
  }

  async findEmployeeById(id: string) {
    try {
      const res = await this.employeeModel.findById(id).exec();
      if (!res) {
        throw new Error('Employee not found');
      }
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async findEmployee({
    id = null,
    firstName = null,
    lastName = null,
    email = null,
  }): Promise<any> {
    try {
      const res = id
        ? await this.findEmployeeById(id)
        : email
        ? await this.employeeModel.findOne({ email }).exec()
        : firstName && lastName
        ? await this.employeeModel.findOne({ firstName, lastName }).exec()
        : firstName
        ? await this.employeeModel.find({ firstName }).exec()
        : lastName
        ? await this.employeeModel.find({ lastName }).exec()
        : await this.findAllEmployees();
      if (!res) {
        return { ERROR: 'Employee not found' };
      }
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = new this.employeeModel(createEmployeeDto);
      return await newEmployee.save();
    } catch (error) {
      return { ERROR: error?.message };
    }
  }

  async deleteEmployeeById(id: string) {
    try {
      const employee = await this.employeeModel.findByIdAndDelete(id).exec();
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async deleteEmployee({ email }) {
    try {
      const employee = await this.employeeModel
        .findOneAndDelete({ email })
        .exec();
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }
}
