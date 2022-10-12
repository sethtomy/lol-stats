import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportConfigService } from '@sethtomy/config/report-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ReportConfigService],
  exports: [ReportConfigService],
})
export class ReportConfigModule {}
