import { Module } from '@nestjs/common';
import { SummonerReportInfraService } from './summoner-report-infra.service';
import { SummonerReportController } from './summoner-report.controller';
import { MatchModule } from '../../../../../../apps/riot-proxy/src/match/match.module';
import { SummonerModule } from '../../../../../../apps/riot-proxy/src/summoner/summoner.module';
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
