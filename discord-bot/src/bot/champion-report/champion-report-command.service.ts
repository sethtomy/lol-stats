import { setTimeout } from 'node:timers/promises';
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { MessageEmbed, User } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Configuration, UserReportApi } from '@inimitable-atl/reports-client';
import { TransformPipe } from '@discord-nestjs/common';
import { GetChampionReportDto } from './get-champion-report.dto';
import { TransformedCommandExecutionContext } from '@discord-nestjs/core/dist/definitions/interfaces/transformed-command-execution-context';

@SubCommand({
  name: 'get',
  description: 'Get champion report for the current user.',
})
@Injectable()
@UsePipes(TransformPipe)
export class ChampionReportCommand
  implements DiscordTransformedCommand<GetChampionReportDto>
{
  async handler(
    @Payload() dto: GetChampionReportDto,
    executionContext: TransformedCommandExecutionContext,
  ): Promise<string | void> {
    const timeOutReachedPromise = setTimeout(2.5 * 1000);
    const user = executionContext.interaction.member.user;
    const userReportApi = ChampionReportCommand.getUserReportApi();
    let embedAlreadySent = false;
    userReportApi
      .userReportInfraControllerGet(user.id, dto.timePeriod)
      .then((res) => {
        const championReport = this.getChampionReport(res, dto);
        ChampionReportCommand.sendMessageEmbed(
          dto,
          user as User,
          championReport,
          executionContext,
        );
        embedAlreadySent = true;
      });
    if (!embedAlreadySent) {
      await timeOutReachedPromise;
      return "I've received your request and will respond shortly.";
    }
  }

  private getChampionReport(res: any, dto: GetChampionReportDto) {
    // todo - types!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.data.championReports.find((cr) => {
      return cr.championName === dto.champion;
    });
  }

  private static sendMessageEmbed(
    dto: GetChampionReportDto,
    user: User,
    championReport: any,
    executionContext: TransformedCommandExecutionContext,
  ) {
    const messageEmbed = new MessageEmbed();
    if (!championReport) {
      messageEmbed
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription(
          `The requested champion "${dto.champion}" is invalid/incorrectly spelled. Reach out to admin for help.`,
        );
    } else {
      messageEmbed
        .setColor('#00FF00')
        .setTitle(`Champion Report for ${user.username}`)
        .addFields([
          { name: 'Champion', value: championReport.championName },
          { name: 'Win Rate', value: championReport.winRate },
          { name: 'Wins', value: championReport.wins.toString() },
          {
            name: 'Total Games',
            value: championReport.totalGames.toString(),
          },
        ]);
    }
    executionContext.interaction.channel.send({
      embeds: [messageEmbed],
    });
  }

  private static getUserReportApi() {
    const config = new Configuration({
      basePath: 'http://localhost:3002',
    });
    return new UserReportApi(config);
  }
}
