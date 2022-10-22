import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':discordUserId')
  findOne(@Param('discordUserId') discordUserId: string) {
    return this.userService.findOne(discordUserId);
  }

  @Patch(':discordUserId')
  update(
    @Param('discordUserId') discordUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(discordUserId, updateUserDto);
  }

  @Delete(':discordUserId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('discordUserId') discordUserId: string) {
    return this.userService.remove(discordUserId);
  }
}
