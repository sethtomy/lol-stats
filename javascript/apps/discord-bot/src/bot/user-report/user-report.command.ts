import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { User } from 'discord.js';
import { Injectable } from '@nestjs/common';
import {
  Configuration,
  UserReportApi,
  UserReportDto,
} from '@sethtomy/report-client';
import { TransformPipe } from '@discord-nestjs/common';
import { TransformedCommandExecutionContext } from '@discord-nestjs/core/dist/definitions/interfaces/transformed-command-execution-context';
import { ReportConfigService, UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { DEFAULT_MESSAGE } from '../common/message';
import { TimeReportDto } from '../common/time-report.dto';
import { AbstractUserCommand } from '../common/abstract-user-command';
import {
  getSuccessMessageEmbed,
  sendMessageEmbedViaInteraction,
} from '../common/message-embed';
import { addLy, capitalizeFirst, leagueToString } from '@sethtomy/util/string';

@SubCommand({
  name: 'get',
  description: 'Get user report for the current user.',
})
@Injectable()
@UsePipes(TransformPipe)
export class UserReportCommand
  extends AbstractUserCommand
  implements DiscordTransformedCommand<TimeReportDto>
{
  private readonly userReportApi: UserReportApi;

  constructor(
    userConfigService: UserConfigService,
    reportConfigService: ReportConfigService,
    httpClientService: HttpClientService,
  ) {
    super(userConfigService, httpClientService);
    const config = new Configuration();
    this.userReportApi = new UserReportApi(
      config,
      reportConfigService.REPORT_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }

  async handler(
    @Payload() dto: TimeReportDto,
    executionContext: TransformedCommandExecutionContext,
  ): Promise<string | void> {
    this.runInBackground(dto, executionContext);
    return DEFAULT_MESSAGE;
  }

  private async runInBackground(
    dto: TimeReportDto,
    executionContext: TransformedCommandExecutionContext,
  ) {
    const discordUser = executionContext.interaction.member.user;
    await this.createUserIfDoesNotExist(discordUser.id);
    const res = await this.userReportApi.userReportInfraControllerGet(
      discordUser.id,
      dto.timePeriod,
    );
    await this.sendMessageEmbed(
      dto,
      discordUser as User,
      res.data,
      executionContext,
    );
  }

  private async sendMessageEmbed(
    dto: TimeReportDto,
    discordUser: User,
    userReport: UserReportDto,
    executionContext: TransformedCommandExecutionContext,
  ) {
    const fields = userReport.championReports.map((championReport, index) => {
      return {
        name: championReport.championName,
        value: `Win Rate ${championReport.winRate}, Wins ${championReport.wins}, Total Games ${championReport.totalGames}`,
        inline: index !== 0,
      };
    });

    const soloDuoMessage = leagueToString(userReport, 'highestSoloDuoLeague');
    const flexMessage = leagueToString(userReport, 'highestFlexLeague');
    const messageEmbed = getSuccessMessageEmbed()
      .setTitle(
        `${addLy(capitalizeFirst(dto.timePeriod))} User Report for ${
          discordUser.username
        }`,
      )
      .addFields([
        { name: 'Win Rate', value: userReport.winRate, inline: true },
        { name: 'Wins', value: userReport.wins.toString(), inline: true },
        {
          name: 'Total Games',
          value: userReport.totalGames.toString(),
          inline: true,
        },
      ])
      .addFields([
        { name: 'Highest Solo/Duo Rank', value: soloDuoMessage, inline: true },
        { name: 'Highest Flex Rank', value: flexMessage, inline: true },
      ])
      .addFields([...fields]);
    sendMessageEmbedViaInteraction(executionContext.interaction, messageEmbed);
  }
}
