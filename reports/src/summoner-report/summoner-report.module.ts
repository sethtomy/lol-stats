import { Module } from '@nestjs/common';
import { SummonerReportService } from './summoner-report.service';
import { SummonerReportController } from './summoner-report.controller';
import { MatchModule } from '../match/match.module';
import { SummonerModule } from '../summoner/summoner.module';

@Module({
  controllers: [SummonerReportController],
  providers: [SummonerReportService],
  imports: [MatchModule, SummonerModule],
})
export class SummonerReportModule {}
