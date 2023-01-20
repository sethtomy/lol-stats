import { DiscordCommand, SubCommand } from '@discord-nestjs/core';
import { CommandInteraction, User } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { sendUserMessageEmbed } from './user-message-embed';
import { DEFAULT_MESSAGE } from '../common/message';
import { AbstractUserCommand } from '../common/abstract-user-command';

@SubCommand({
  name: 'get',
  description: 'Get current user.',
})
@Injectable()
export class GetUserCommand
  extends AbstractUserCommand
  implements DiscordCommand
{
  constructor(
    userConfigService: UserConfigService,
    httpClientService: HttpClientService,
  ) {
    super(userConfigService, httpClientService);
  }

  async handler(interaction: CommandInteraction): Promise<string> {
    const discordUser = interaction.member.user as User;
    const user = await this.createUserIfDoesNotExist(discordUser.id);
    sendUserMessageEmbed(interaction, discordUser, user.summonerNames);
    return DEFAULT_MESSAGE;
  }
}
