import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot-gateway';
import { GetUserCommand } from './user/get-user.command';
import { LsCommand } from './ls.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, GetUserCommand, LsCommand],
})
export class BotModule {}
