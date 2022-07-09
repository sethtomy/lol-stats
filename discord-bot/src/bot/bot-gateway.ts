import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once, PrefixCommand } from '@discord-nestjs/core';
import { Client, Message, MessageEmbed } from 'discord.js';
import {
  Configuration,
  UserApi,
  UserReportApi,
} from '@inimitable-atl/reports-client';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  // EmbedCreateSpec embedCreateSpec = EmbedCreateSpec.builder()
  //   .title("Report results")
  //   .description(String.format("User report for %s.", report.getOwner()))
  //   .color(Color.GREEN)
  //   .addField("Summoners", Arrays.toString(report.getSummonerNames().toArray()), false)
  //   .addField("Duration", duration, false)
  //   .addField("Win Rate", DEFAULT_PERCENTAGE_FORMAT.format(report.getWinRate()), false)
  //   .addField("Wins", String.valueOf(report.getWins()), false)
  //   .addField("Losses", String.valueOf(report.getLosses()), false)
  //   .addField("Average Kill Participation", DEFAULT_PERCENTAGE_FORMAT.format(report.getAvgKillParticipation()), false)
  //   .addField("Average Vision Score", DEFAULT_DOUBLE_FORMAT.format(report.getAvgVisionScore()), false)
  //   .build();
  @PrefixCommand('ls-user', { prefix: '!' })
  async onUserMessage(message: Message): Promise<void> {
    const config = new Configuration({
      basePath: 'http://localhost:3002',
    });
    const usersApi = new UserApi(config);
    const res = await usersApi.userControllerFindOne(message.author.id);
    const messageEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('User Data')
      .addFields({ name: 'User Name', value: message.author.id })
      .addFields(
        // todo get types here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.data.summoners.map((summoner, idx) => {
          return { name: `Summoner ${idx + 1}`, value: summoner };
        }),
      );
    message.channel.send({ embeds: [messageEmbed] });
  }

  @PrefixCommand('ls', { prefix: '!' })
  async onReportMessage(message: Message): Promise<string> {
    const config = new Configuration({
      basePath: 'http://localhost:3002',
    });
    const userReportApi = new UserReportApi(config);
    const res = await userReportApi.userReportInfraControllerGet(
      message.author.id,
      'week',
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.stringify(res.data);
  }
}
