import { Injectable } from '@nestjs/common';
import { SummonerReportInfraService } from '../summoner-infra-report/summoner-report-infra.service';
import { DateTimeUnit } from 'luxon';
import { UserReportService } from '../../domain/user-report/user-report.service';
import { Configuration, UserApi } from '@sethtomy/user-client';
import { UserConfigService } from '@sethtomy/config/user-config.service';
import { HttpClientService } from '@sethtomy/http-client';
import { UserReportDto } from '../../domain/user-report/user-report.dto';

@Injectable()
export class UserReportInfraService {
  private readonly userApi: UserApi;

  constructor(
    private readonly summonerReportInfraService: SummonerReportInfraService,
    private readonly userReportService: UserReportService,
    private readonly userConfigService: UserConfigService,
    httpClientService: HttpClientService,
  ) {
    const configuration = new Configuration();
    this.userApi = new UserApi(
      configuration,
      userConfigService.USER_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }

  async get(
    userName: string,
    timePeriod: DateTimeUnit,
  ): Promise<UserReportDto> {
    try {
      const userRes = await this.userApi.userControllerFindOne(userName);
      const user = userRes.data;
      const summonerReports = await Promise.all(
        user.summonerNames.map((summoner) => {
          return this.summonerReportInfraService.getSummonerReportByPeriod(
            summoner,
            timePeriod,
          );
        }),
      );
      return this.userReportService.get(user, summonerReports);
    } catch (error) {
      throw error;
    }
  }
}
