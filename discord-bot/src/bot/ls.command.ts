import { Command, UseGroup } from '@discord-nestjs/core';
import { GetUserCommand } from './user/get-user.command';
import { ChampionReportCommand } from './champion-report/champion-report-command.service';

@Command({
  name: 'ls',
  description: 'League Stats Discord Bot',
  include: [
    UseGroup(
      { name: 'user', description: 'User administration.' },
      GetUserCommand,
    ),
    UseGroup(
      {
        name: 'champion-report',
        description: 'Champion report for the current user.',
      },
      ChampionReportCommand,
    ),
  ],
})
export class LsCommand {}
