import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot-gateway';
import { GetUserCommand } from './user/get-user.command';
import { LsCommand } from './ls.command';
import { ChampionReportCommand } from './champion-report/champion-report-command.service';
import { ReportConfigModule, UserConfigModule } from '@sethtomy/config';
import { HttpClientModule } from '@sethtomy/http-client';

@Module({
  imports: [
    HttpClientModule,
    DiscordModule.forFeature(),
    UserConfigModule,
    ReportConfigModule,
  ],
  providers: [BotGateway, GetUserCommand, LsCommand, ChampionReportCommand],
})
export class BotModule {}
