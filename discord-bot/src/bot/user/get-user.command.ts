import { DiscordCommand, SubCommand } from '@discord-nestjs/core';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Configuration, UserApi } from '@inimitable-atl/openapi-client-generator';

@SubCommand({
  name: 'get',
  description: 'Get current user.',
})
@Injectable()
export class GetUserCommand implements DiscordCommand {
  async handler(interaction: CommandInteraction): Promise<void> {
    const user = interaction.member.user;
    const config = new Configuration({
      basePath: 'http://localhost:3002',
    });
    const usersApi = new UserApi(config);
    const res = await usersApi.userControllerFindOne(user.id);
    const messageEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('User Data')
      .addFields({ name: 'User Name', value: user.username })
      .addFields(
        // todo get types here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.data.summoners.map((summoner, idx) => {
          return { name: `Summoner ${idx + 1}`, value: summoner };
        }),
      );
    interaction.channel.send({ embeds: [messageEmbed] });
  }
}
