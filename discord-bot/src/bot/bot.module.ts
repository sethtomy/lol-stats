import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot-gateway';
import { ReportCommand } from './report-command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, ReportCommand],
})
export class BotModule {}
