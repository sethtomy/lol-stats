import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const users = [
  new UserDto('370239122222350336', ['HeavensVanguard', 'BDGxHvnsVngrd']),
  new UserDto('193797571271983105', ['Bubbly Vibes', 'BDGxChampizzle']),
  new UserDto('401784222609571841', [
    'Creamy Vibes',
    'damadbagginj3w',
    'feedthenafkff15',
  ]),
  new UserDto('176944443331575809', ['pyramin']),
];

@Injectable()
export class UserService {
  findOne(id: string): UserDto {
    return users.find((user) => user.discordId === id);
  }
}
