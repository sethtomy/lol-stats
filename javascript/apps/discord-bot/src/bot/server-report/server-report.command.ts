import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import {
  Configuration,
  ServerReportApi,
  UserReportDto,
} from '@sethtomy/report-client';
import { TransformPipe } from '@discord-nestjs/common';
import { TransformedCommandExecutionContext } from '@discord-nestjs/core/dist/definitions/interfaces/transformed-command-execution-context';
import { ReportConfigService, UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { DEFAULT_MESSAGE } from '../common/message';
import { TimeReportDto } from '../common/time-report.dto';
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
export class ServerReportCommand
  implements DiscordTransformedCommand<TimeReportDto>
{
  private readonly logger: Logger = new Logger(ServerReportCommand.name);
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
    this.runInBackground(dto, executionContext).catch((error) => {
      this.logger.error(error);
    });
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
    userReportDtos: UserReportDto[],
    executionContext: TransformedCommandExecutionContext,
    timePeriod: string,
  ) {
    const guild = await executionContext.interaction.guild.fetch();
    userReportDtos = userReportDtos.filter((userReportDto) => {
      const user = guild.members.cache.get(userReportDto.userName);
      if (user) {
        userReportDto.userName = user.user.username;
      }
      return !!user;
    });
    const fields = userReportDtos.map((userReportDto) => {
      const leagueMessage = leagueToString(
        userReportDto,
        'highestSoloDuoLeague',
      );
      return {
        name: `${userReportDto.userName}`,
        value: `${userReportDto.winRate}, ${userReportDto.totalGames} games, ${leagueMessage}`,
      };
    });
    const messageEmbed = getSuccessMessageEmbed()
      .setTitle(`${addLy(capitalizeFirst(timePeriod))} Server Report`)
      .addFields(fields);
    sendMessageEmbedViaInteraction(executionContext.interaction, messageEmbed);
  }
}
