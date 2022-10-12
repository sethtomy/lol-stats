import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotModule } from './bot/bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Intents } from 'discord.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_BOT_TOKEN'),
        discordClientOptions: {
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        },
        registerCommandOptions: [
          {
            forGuild: '402225150512070677', // swank palace
            removeCommandsBefore: true,
          },
        ],
      }),
      inject: [ConfigService],
    }),
    BotModule,
  ],
})
export class AppModule {}
