import { Module } from '@nestjs/common';
import { SummonerModule } from './riot-api/summoner/summoner.module';
import { RiotModule } from './riot-api/riot/riot.module';
import { MatchModule } from './riot-api/match/match.module';
import { SummonerReportInfraModule } from './report-api/infra/summoner-infra-report/summoner-report-infra.module';
import { ChampionReportModule } from './report-api/domain/champion-report/champion-report.module';

@Module({
  imports: [
    SummonerModule,
    RiotModule,
    MatchModule,
    SummonerReportInfraModule,
    ChampionReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
