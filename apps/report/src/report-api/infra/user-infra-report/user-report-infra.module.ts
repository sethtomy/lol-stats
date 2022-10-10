import { Module } from '@nestjs/common';
import { SummonerReportInfraModule } from '../summoner-infra-report/summoner-report-infra.module';
import { UserReportInfraService } from './user-report-infra.service';
import { UserReportInfraController } from './user-report-infra.controller';
import { UserReportModule } from '../../domain/user-report/user-report.module';
import { CommonConfigModule } from '@sethtomy/config';

@Module({
  imports: [CommonConfigModule, SummonerReportInfraModule, UserReportModule],
  providers: [UserReportInfraService],
  controllers: [UserReportInfraController],
})
export class UserReportInfraModule {}
