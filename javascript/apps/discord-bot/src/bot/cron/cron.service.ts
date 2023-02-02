import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Channel, Client } from 'discord.js';
import { Cron, CronOptions } from '@nestjs/schedule';
import {
  getSuccessMessageEmbed,
  sendMessageEmbed,
} from '../common/message-embed';
import {
  Configuration,
  ServerReportApi,
  UserReportDto,
} from '@sethtomy/report-client';
import { ReportConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { addLy, capitalizeFirst, leagueToString } from '@sethtomy/util/string';

/**
 * @todo Remove duplicated code from Server Report Command
 */
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly LEAGUE_CHANNEL_ID = '886588070869233675';
  private readonly serverReportApi: ServerReportApi;

  private static CRON_OPTIONS: CronOptions = { timeZone: 'AMERICA/NEW_YORK' };

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
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

  @Cron('30 23 * * *', CronService.CRON_OPTIONS)
  async dailyCron() {
    const TIME_PERIOD = 'day';
    await this.sendServerReport(TIME_PERIOD);
  }

  @Cron('30 23 * * 0', CronService.CRON_OPTIONS)
  async weeklyCron() {
    const TIME_PERIOD = 'week';
    await this.sendServerReport(TIME_PERIOD);
  }

  /**
   * @todo Add riot proxy support for "previous" day/week/month
   */
  @Cron('30 23 28 * *', CronService.CRON_OPTIONS)
  async twentyEightCron() {
    const TIME_PERIOD = 'month';
    await this.sendServerReport(TIME_PERIOD);
  }

  private async sendServerReport(timePeriod: 'day' | 'week' | 'month') {
    this.logger.log(`Handling ${timePeriod} Cron Job...`);
    const channel = this.client.channels.cache.get(this.LEAGUE_CHANNEL_ID);
    const res = await this.serverReportApi.serverReportInfraControllerGet(
      timePeriod,
    );
    await this.sendMessageEmbed(res.data, channel, timePeriod);
    this.logger.log(`Successfully handled ${timePeriod} Cron Job!`);
  }

  private async sendMessageEmbed(
    userReportDtos: UserReportDto[],
    channel: Channel,
    timePeriod: string,
  ) {
    await Promise.all(
      userReportDtos.map(async (userReportDto) => {
        const user = await this.client.users.fetch(userReportDto.userName);
        userReportDto.userName = user.username;
      }),
    );
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
    sendMessageEmbed(channel, messageEmbed);
  }
}
