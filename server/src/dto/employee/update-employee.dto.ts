import { PartialType } from '@nestjs/mapped-types';
import CreateEmployeeDto from './create-employee.dto';

class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export default UpdateEmployeeDto;
