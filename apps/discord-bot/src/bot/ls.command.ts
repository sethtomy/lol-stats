import { Command, UseGroup } from '@discord-nestjs/core';
import { GetUserCommand } from './user/get-user.command';
import { ChampionReportCommand } from './champion-report/champion-report.command';
import { AddSummonerCommand } from './user/add-summoner.command';
import { RemoveSummonerCommand } from './user/remove-summoner.command';
import { UserReportCommand } from './user-report/user-report.command';

@Command({
  name: 'ls',
  description: 'League Stats Discord Bot',
  include: [
    UseGroup(
      { name: 'user', description: 'User administration.' },
      GetUserCommand,
      AddSummonerCommand,
      RemoveSummonerCommand,
    ),
    UseGroup(
      {
        name: 'champion-report',
        description: 'Champion report for the current user.',
      },
      ChampionReportCommand,
    ),
    UseGroup(
      {
        name: 'user-report',
        description: 'User report for the current user.',
      },
      UserReportCommand,
    ),
  ],
})
export class LsCommand {}
