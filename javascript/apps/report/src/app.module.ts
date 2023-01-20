import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { SummonerReportInfraModule } from './report-api/infra/summoner-infra-report/summoner-report-infra.module';
import { ChampionReportModule } from './report-api/domain/champion-report/champion-report.module';
import { UserReportInfraModule } from './report-api/infra/user-infra-report/user-report-infra.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServerReportInfraModule } from './report-api/infra/server-report-infra/server-report-infra.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 100,
    }),
    SummonerReportInfraModule,
    ChampionReportModule,
    UserReportInfraModule,
    ServerReportInfraModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
