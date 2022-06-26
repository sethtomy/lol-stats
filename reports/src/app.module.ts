import { Module } from '@nestjs/common';
import { SummonerModule } from './summoner/summoner.module';
import { RiotModule } from './riot/riot.module';
import { MatchModule } from './match/match.module';
import { SummonerReportModule } from './summoner-report/summoner-report.module';

@Module({
  imports: [SummonerModule, RiotModule, MatchModule, SummonerReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
