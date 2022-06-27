import { PartialType } from '@nestjs/mapped-types';
import { CreateUserApiDto } from './create-user-api.dto';

export class UpdateUserApiDto extends PartialType(CreateUserApiDto) {}
