import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot-gateway';
import { GetUserCommand } from './user/get-user.command';
import { LsCommand } from './ls.command';
import { ChampionReportCommand } from './champion-report/champion-report.command';
import { ReportConfigModule, UserConfigModule } from '@sethtomy/config';
import { HttpClientModule } from '@sethtomy/http-client';
import { AddSummonerCommand } from './user/add-summoner.command';
import { RemoveSummonerCommand } from './user/remove-summoner.command';
import { UserReportCommand } from './user-report/user-report.command';
import { ServerReportCommand } from './server-report/server-report.command';
import { CronService } from './cron/cron.service';

@Module({
  imports: [
    HttpClientModule,
    DiscordModule.forFeature(),
    UserConfigModule,
    ReportConfigModule,
  ],
  providers: [
    BotGateway,
    GetUserCommand,
    LsCommand,
    ChampionReportCommand,
    AddSummonerCommand,
    RemoveSummonerCommand,
    UserReportCommand,
    ServerReportCommand,
    CronService,
  ],
})
export class BotModule {}
