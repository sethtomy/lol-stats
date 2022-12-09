import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import {
  Configuration,
  ServerReportApi,
  ServerReportDto,
} from '@sethtomy/report-client';
import { TransformPipe } from '@discord-nestjs/common';
import { TransformedCommandExecutionContext } from '@discord-nestjs/core/dist/definitions/interfaces/transformed-command-execution-context';
import { ReportConfigService, UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { DEFAULT_MESSAGE } from '../common/message';
import { TimeReportDto } from '../common/time-report.dto';
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
export class ServerReportCommand
  implements DiscordTransformedCommand<TimeReportDto>
{
  private readonly serverReportApi: ServerReportApi;

  constructor(
    userConfigService: UserConfigService,
    reportConfigService: ReportConfigService,
    httpClientService: HttpClientService,
  ) {
    const config = new Configuration();
    this.serverReportApi = new ServerReportApi(
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
    const res = await this.serverReportApi.serverReportInfraControllerGet(
      dto.timePeriod,
    );
    await this.sendMessageEmbed(res.data, executionContext, dto.timePeriod);
  }

  private async sendMessageEmbed(
    userReport: ServerReportDto,
    executionContext: TransformedCommandExecutionContext,
    timePeriod: string,
  ) {
    const [highestUser, lowestUser] = await Promise.all([
      executionContext.interaction.client.users.fetch(
        userReport.highestWinRate.userName,
      ),
      executionContext.interaction.client.users.fetch(
        userReport.lowestWinRate.userName,
      ),
    ]);
    const messageEmbed = getSuccessMessageEmbed()
      .setTitle(
        `Server Report for the Current ${
          timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)
        }`,
      )
      .addFields([
        {
          name: 'Highest Win Rate',
          value: `${highestUser.username} ${userReport.highestWinRate.winRate}`,
        },
        {
          name: 'Lowest Win Rate',
          value: `${lowestUser.username} ${userReport.lowestWinRate.winRate}`,
        },
      ]);
    sendMessageEmbed(executionContext.interaction, messageEmbed);
  }
}
