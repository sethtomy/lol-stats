import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userApiService: UserService) {}

  @Get(':name')
  findOne(@Param('name') name: string): CreateUserApiDto {
    return this.userApiService.findOne(name);
  }
}
