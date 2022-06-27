import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userApiService: UserService) {}

  @Get(':name')
  findOne(@Param('name') name: string): UserDto {
    return this.userApiService.findOne(name);
  }
}
