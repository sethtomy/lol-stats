import { Module } from '@nestjs/common';
import { SummonerReportInfraService } from './summoner-report-infra.service';
import { SummonerReportController } from './summoner-report.controller';
import { MatchModule } from '../../../../../../riot-proxy/server/src/match/match.module';
import { SummonerModule } from '../../../../../../riot-proxy/server/src/summoner/summoner.module';
import { ChampionReportModule } from '../../domain/champion-report/champion-report.module';
import { SummonerReportModule } from '../../domain/summoner-report/summoner-report.module';

@Module({
  controllers: [SummonerReportController],
  providers: [SummonerReportInfraService],
  imports: [
    MatchModule,
    SummonerModule,
    ChampionReportModule,
    SummonerReportModule,
  ],
  exports: [SummonerReportInfraService],
})
export class SummonerReportInfraModule {}
