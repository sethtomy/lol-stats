import { Module } from '@nestjs/common';
import { UserReportService } from './user-report.service';

@Module({
  providers: [UserReportService],
  exports: [UserReportService],
})
export class UserReportModule {}
