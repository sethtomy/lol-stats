import { Command, UseGroup } from '@discord-nestjs/core';
import { GetUserCommand } from './user/get-user.command';

@Command({
  name: 'ls',
  description: 'League Stats Discord Bot',
  include: [
    UseGroup(
      { name: 'user', description: 'User administration.' },
      GetUserCommand,
    ),
  ],
})
export class LsCommand {}
