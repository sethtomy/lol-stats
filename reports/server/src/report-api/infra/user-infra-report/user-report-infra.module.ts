import { Module } from '@nestjs/common';
import { SummonerReportInfraModule } from '../summoner-infra-report/summoner-report-infra.module';
import { UserApiModule } from '../../../user-api/user-api.module';
import { UserReportInfraService } from './user-report-infra.service';
import { UserReportInfraController } from './user-report-infra.controller';
import { UserReportModule } from '../../domain/user-report/user-report.module';

@Module({
  imports: [SummonerReportInfraModule, UserApiModule, UserReportModule],
  providers: [UserReportInfraService],
  controllers: [UserReportInfraController],
})
export class UserReportInfraModule {}
