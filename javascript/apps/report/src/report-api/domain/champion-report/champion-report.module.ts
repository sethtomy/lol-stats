import { Module } from '@nestjs/common';
import { ChampionReportService } from './champion-report.service';

@Module({
  providers: [ChampionReportService],
  exports: [ChampionReportService],
})
export class ChampionReportModule {}
