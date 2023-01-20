import { Injectable } from '@nestjs/common';
import { DateTimeUnit } from 'luxon';
import { UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { Configuration, UserApi } from '@sethtomy/user-client';
import { UserReportInfraService } from '../user-infra-report/user-report-infra.service';
import { ServerReportService } from '../../domain/server-report/server-report.service';
import { UserReportDto } from '../../domain/user-report/user-report.dto';

@Injectable()
export class ServerReportInfraService {
  private readonly userApi: UserApi;

  constructor(
    private readonly serverReportService: ServerReportService,
    private readonly userReportInfraService: UserReportInfraService,
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

  public async get(timePeriod: DateTimeUnit): Promise<UserReportDto[]> {
    const usersResponse = await this.userApi.userControllerFindAll();
    const userReports = await Promise.all(
      usersResponse.data.map((user) =>
        this.userReportInfraService.get(user.discordUserId, timePeriod),
      ),
    );
    return this.serverReportService.get(userReports);
  }
}
