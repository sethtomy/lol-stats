import { DiscordCommand, SubCommand } from '@discord-nestjs/core';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Configuration, UserApi } from '@sethtomy/user-client';
import { UserConfigService } from '@sethtomy/config';

@SubCommand({
  name: 'get',
  description: 'Get current user.',
})
@Injectable()
export class GetUserCommand implements DiscordCommand {
  private readonly userApi: UserApi;

  constructor(userConfigService: UserConfigService) {
    const config = new Configuration({
      basePath: userConfigService.USER_BASE_PATH,
    });
    this.userApi = new UserApi(config);
  }
  async handler(interaction: CommandInteraction): Promise<void> {
    const user = interaction.member.user;
    const res = await this.userApi.userControllerFindOne(user.id);
    const messageEmbed = new MessageEmbed()
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
