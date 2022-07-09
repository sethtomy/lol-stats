import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { MessageEmbed } from 'discord.js';
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
  ) {
    const user = executionContext.interaction.member.user;
    const config = new Configuration({
      basePath: 'http://localhost:3002',
    });

    const userReportApi = new UserReportApi(config);
    let res;
    try {
      res = await userReportApi.userReportInfraControllerGet(
        user.id,
        dto.timePeriod,
      );
    } catch (error) {
      console.log(error);
    }

    // todo - types!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const championReport = res.data.championReports.find((cr) => {
      return cr.championName === dto.champion;
    });
    const messageEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle(`Champion Report for ${user.username}`)
      .addFields([
        { name: 'Champion', value: championReport.championName },
        { name: 'Win Rate', value: championReport.winRate },
        { name: 'Wins', value: championReport.wins.toString() },
        { name: 'Total Games', value: championReport.totalGames.toString() },
      ]);
    executionContext.interaction.channel.send({ embeds: [messageEmbed] });
  }
}
