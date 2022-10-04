import { Controller, Get, Param } from '@nestjs/common';
import { SummonerReportInfraService } from './summoner-report-infra.service';
import { ApiTags } from '@nestjs/swagger';
import { DateTimeUnit } from 'luxon';
import SummonerReportDto from './models/summoner-report.dto';
import ChampionReportDto from '../../domain/champion-report/champion-report.dto';

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
  ): Promise<SummonerReportDto> {
    return this.summonerReportService.getSummonerReportByPeriod(
      summonerName,
      timePeriod,
    );
  }

  @Get(':summonerName/champion/:championName/time-period/:timePeriod')
  public async getSummonerReportByPeriodAndChampion(
    @Param('summonerName') summonerName: string,
    @Param('championName') championName: string,
    @Param('timePeriod') timePeriod: DateTimeUnit,
  ): Promise<ChampionReportDto> {
    return this.summonerReportService.getSummonerReportByPeriodAndChampion(
      summonerName,
      championName,
      timePeriod,
    );
  }
}
