import { Module } from '@nestjs/common';
import { RiotModule } from '../../riot-proxy/src/riot/riot.module';
import { MatchModule } from './riot-api/match/match.module';
import { SummonerReportInfraModule } from './report-api/infra/summoner-infra-report/summoner-report-infra.module';
import { ChampionReportModule } from './report-api/domain/champion-report/champion-report.module';
import { UserApiModule } from './user-api/user-api.module';
import { UserReportInfraModule } from './report-api/infra/user-infra-report/user-report-infra.module';

@Module({
  imports: [
    RiotModule,
    MatchModule,
    SummonerReportInfraModule,
    ChampionReportModule,
    UserReportInfraModule,
    UserApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
