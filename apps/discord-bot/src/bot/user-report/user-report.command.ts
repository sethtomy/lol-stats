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
  sendMessageEmbed,
} from '../common/message-embed';

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
      discordUser as User,
      res.data,
      executionContext,
    );
  }

  private async sendMessageEmbed(
    discordUser: User,
    userReport: UserReportDto,
    executionContext: TransformedCommandExecutionContext,
  ) {
    const fields = userReport.championReports.map((championReport) => {
      return {
        name: championReport.championName,
        value: `Win Rate ${championReport.winRate}, Wins ${championReport.wins}, Total Games ${championReport.totalGames}`,
      };
    });
    const messageEmbed = getSuccessMessageEmbed()
      .setTitle(`User Report for ${discordUser.username}`)
      .addFields([
        { name: 'Win Rate', value: userReport.winRate },
        { name: 'Wins', value: userReport.wins.toString() },
        { name: 'Total Games', value: userReport.totalGames.toString() },
        ...fields,
      ]);
    sendMessageEmbed(executionContext.interaction, messageEmbed);
  }
}
