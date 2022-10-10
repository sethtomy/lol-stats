import { Module } from '@nestjs/common';
import { SummonerReportInfraService } from './summoner-report-infra.service';
import { SummonerReportController } from './summoner-report.controller';
import { ChampionReportModule } from '../../domain/champion-report/champion-report.module';
import { SummonerReportModule } from '../../domain/summoner-report/summoner-report.module';
import { CommonConfigModule } from '@sethtomy/config';
import { HttpClientModule } from '@sethtomy/http-client';

@Module({
  controllers: [SummonerReportController],
  providers: [SummonerReportInfraService],
  imports: [
    HttpClientModule,
    CommonConfigModule,
    ChampionReportModule,
    SummonerReportModule,
  ],
  exports: [SummonerReportInfraService],
})
export class SummonerReportInfraModule {}
