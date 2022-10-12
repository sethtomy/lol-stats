import { DiscordCommand, SubCommand } from '@discord-nestjs/core';
import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Configuration, UserApi } from '@sethtomy/user-client';
import { UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';

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
    const user = interaction.member.user;
    const res = await this.userApi.userControllerFindOne(user.id);
    const messageEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('User Data')
      .addFields({ name: 'User Name', value: user.username })
      .addFields(
        res.data.summonerNames.map((summoner, idx) => {
          return { name: `Summoner ${idx + 1}`, value: summoner };
        }),
      );
    interaction.channel.send({ embeds: [messageEmbed] });
  }
}
