import { Module } from '@nestjs/common';
import { ChampionReportModule } from '../champion-report/champion-report.module';
import { SummonerReportService } from './summoner-report.service';

@Module({
  providers: [SummonerReportService],
  exports: [SummonerReportService],
  imports: [ChampionReportModule],
})
export class SummonerReportModule {}
