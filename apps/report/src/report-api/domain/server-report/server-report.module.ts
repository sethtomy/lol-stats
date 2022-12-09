import { Module } from '@nestjs/common';
import { ServerReportService } from './server-report.service';

@Module({
  providers: [ServerReportService],
  exports: [ServerReportService],
})
export class ServerReportModule {}
