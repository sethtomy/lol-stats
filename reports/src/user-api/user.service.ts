import { Injectable } from '@nestjs/common';
import { CreateUserApiDto } from './dto/create-user-api.dto';

const users = {
  Seth: new CreateUserApiDto('Seth', ['HeavensVanguard', 'BDGxHvnsVngrd']),
};

@Injectable()
export class UserService {
  findOne(name: string): CreateUserApiDto {
    return users[name];
  }
}
