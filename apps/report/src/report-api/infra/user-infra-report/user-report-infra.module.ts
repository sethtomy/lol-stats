import { Module } from '@nestjs/common';
import { SummonerReportInfraModule } from '../summoner-infra-report/summoner-report-infra.module';
import { UserReportInfraService } from './user-report-infra.service';
import { UserReportInfraController } from './user-report-infra.controller';
import { UserReportModule } from '../../domain/user-report/user-report.module';
import { UserConfigModule } from '@sethtomy/config';
import { HttpClientModule } from '@sethtomy/http-client';

@Module({
  imports: [
    HttpClientModule,
    UserConfigModule,
    SummonerReportInfraModule,
    UserReportModule,
  ],
  providers: [UserReportInfraService],
  controllers: [UserReportInfraController],
  exports: [UserReportInfraService],
})
export class UserReportInfraModule {}
