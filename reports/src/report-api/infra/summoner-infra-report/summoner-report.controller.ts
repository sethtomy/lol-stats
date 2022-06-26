import { Controller, Get, Param } from '@nestjs/common';
import { SummonerReportInfraService } from './summoner-report-infra.service';
import { ApiTags } from '@nestjs/swagger';
import { DateTimeUnit } from 'luxon';

@ApiTags('summoner-report')
@Controller('summoner-report')
export class SummonerReportController {
  constructor(
    private readonly summonerReportService: SummonerReportInfraService,
  ) {}

  @Get(':summonerName/time-period/:timePeriod')
  public async getSummonerReportByPeriod(
    @Param('summonerName') summonerName: string,
    @Param('timePeriod') timePeriod: DateTimeUnit,
  ) {
    return this.summonerReportService.getSummonerReportByPeriod(
      summonerName,
      timePeriod,
    );
  }
}
