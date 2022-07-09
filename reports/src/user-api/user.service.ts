import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const users = [
  new UserDto('370239122222350336', ['HeavensVanguard', 'BDGxHvnsVngrd']),
];

@Injectable()
export class UserService {
  findOne(id: string): UserDto {
    return users.find((user) => user.discordId === id);
  }
}
