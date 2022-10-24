import { setTimeout } from 'node:timers/promises';
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { EmbedBuilder, User } from 'discord.js';
import { Injectable, Logger } from '@nestjs/common';
import {
  Configuration,
  UserReportApi,
  UserReportDto,
} from '@sethtomy/report-client';
import { TransformPipe } from '@discord-nestjs/common';
import { GetChampionReportDto } from './get-champion-report.dto';
import { TransformedCommandExecutionContext } from '@discord-nestjs/core/dist/definitions/interfaces/transformed-command-execution-context';
import { ReportConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { DEFAULT_MESSAGE } from '../common/message';

@SubCommand({
  name: 'get',
  description: 'Get champion report for the current user.',
})
@Injectable()
@UsePipes(TransformPipe)
export class ChampionReportCommand
  implements DiscordTransformedCommand<GetChampionReportDto>
{
  private readonly logger: Logger = new Logger(ChampionReportCommand.name);
  private readonly userReportApi: UserReportApi;

  constructor(
    reportConfigService: ReportConfigService,
    httpClientService: HttpClientService,
  ) {
    const config = new Configuration();
    this.userReportApi = new UserReportApi(
      config,
      reportConfigService.REPORT_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }

  async handler(
    @Payload() dto: GetChampionReportDto,
    executionContext: TransformedCommandExecutionContext,
  ): Promise<string | void> {
    const timeOutReachedPromise = setTimeout(2.5 * 1000);
    const user = executionContext.interaction.member.user;
    let embedAlreadySent = false;
    this.userReportApi
      .userReportInfraControllerGet(user.id, dto.timePeriod)
      .then((res) => {
        const championReport = this.getChampionReport(res.data, dto);
        ChampionReportCommand.sendMessageEmbed(
          dto,
          user as User,
          championReport,
          executionContext,
        );
        embedAlreadySent = true;
      })
      .catch((error) => {
        this.logger.error(error);
      });
    if (!embedAlreadySent) {
      await timeOutReachedPromise;
      return DEFAULT_MESSAGE;
    }
  }

  private getChampionReport(
    userReportDto: UserReportDto,
    dto: GetChampionReportDto,
  ) {
    return userReportDto.championReports.find((cr) => {
      return cr.championName === dto.champion;
    });
  }

  private static sendMessageEmbed(
    dto: GetChampionReportDto,
    user: User,
    championReport: any,
    executionContext: TransformedCommandExecutionContext,
  ) {
    const messageEmbed = new EmbedBuilder();
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
}
