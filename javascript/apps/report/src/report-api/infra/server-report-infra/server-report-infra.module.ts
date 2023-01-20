import { Module } from '@nestjs/common';
import { ServerReportInfraService } from './server-report-infra.service';
import { ServerReportInfraController } from './server-report-infra.controller';
import { HttpClientModule } from '@sethtomy/http-client';
import { UserConfigModule } from '@sethtomy/config';
import { UserReportInfraModule } from '../user-infra-report/user-report-infra.module';
import { ServerReportModule } from '../../domain/server-report/server-report.module';

@Module({
  imports: [
    HttpClientModule,
    UserConfigModule,
    UserReportInfraModule,
    ServerReportModule,
  ],
  controllers: [ServerReportInfraController],
  providers: [ServerReportInfraService],
})
export class ServerReportInfraModule {}
