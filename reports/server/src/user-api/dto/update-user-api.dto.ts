import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UpdateUserApiDto extends PartialType(UserDto) {}
