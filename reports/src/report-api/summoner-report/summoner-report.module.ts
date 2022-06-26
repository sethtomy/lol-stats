import { Module } from '@nestjs/common';
import { SummonerReportService } from './summoner-report.service';
import { SummonerReportController } from './summoner-report.controller';
import { MatchModule } from '../../riot-api/match/match.module';
import { SummonerModule } from '../../riot-api/summoner/summoner.module';
import { ChampionReportModule } from '../domain/champion-report/champion-report.module';

@Module({
  controllers: [SummonerReportController],
  providers: [SummonerReportService],
  imports: [MatchModule, SummonerModule, ChampionReportModule],
})
export class SummonerReportModule {}
