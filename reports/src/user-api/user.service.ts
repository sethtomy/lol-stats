import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const users = {
  Seth: new UserDto('Seth', ['HeavensVanguard', 'BDGxHvnsVngrd']),
};

@Injectable()
export class UserService {
  findOne(name: string): UserDto {
    return users[name];
  }
}
