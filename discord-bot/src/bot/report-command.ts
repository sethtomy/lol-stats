import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Configuration, UserApi } from '@inimitable-atl/reports-client';

@Command({
  name: 'ls',
  description: 'Get current user.',
})
@Injectable()
export class ReportCommand implements DiscordCommand {
  handler(interaction: CommandInteraction): string {
    const user = interaction.member.user;
    const config = new Configuration({
      basePath: 'http://localhost:3002',
    });
    const usersApi = new UserApi(config);
    usersApi.userControllerFindOne(user.id).then((res) => {
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
    });
    return "I've received your request and will respond shortly.";
  }
}
