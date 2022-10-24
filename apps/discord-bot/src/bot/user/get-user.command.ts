import { DiscordCommand, SubCommand } from '@discord-nestjs/core';
import { CommandInteraction, User } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Configuration, UserApi } from '@sethtomy/user-client';
import { UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { sendUserMessageEmbed } from './user-message-embed';

@SubCommand({
  name: 'get',
  description: 'Get current user.',
})
@Injectable()
export class GetUserCommand implements DiscordCommand {
  private readonly userApi: UserApi;

  constructor(
    userConfigService: UserConfigService,
    httpClientService: HttpClientService,
  ) {
    const config = new Configuration();
    this.userApi = new UserApi(
      config,
      userConfigService.USER_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }
  async handler(interaction: CommandInteraction): Promise<void> {
    const user = interaction.member.user as User;
    const res = await this.userApi.userControllerFindOne(user.id);
    sendUserMessageEmbed(interaction, user, res.data.summonerNames);
  }
}
