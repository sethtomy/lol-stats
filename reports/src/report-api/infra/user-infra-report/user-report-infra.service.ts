import { Injectable } from '@nestjs/common';
import { SummonerReportInfraService } from '../summoner-infra-report/summoner-report-infra.service';
import { DateTimeUnit } from 'luxon';
import { UserService } from '../../../user-api/user.service';

@Injectable()
export class UserReportInfraService {
  constructor(
    private readonly summonerReportInfraService: SummonerReportInfraService,
    private readonly userService: UserService,
  ) {}

  async get(userName: string, timePeriod: DateTimeUnit) {
    const user = await this.userService.findOne(userName);
    const summonerReports = await Promise.all(
      user.summoners.map((summoner) => {
        return this.summonerReportInfraService.getSummonerReportByPeriod(
          summoner,
          timePeriod,
        );
      }),
    );
    return summonerReports;
  }
}
