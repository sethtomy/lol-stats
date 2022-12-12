import { Controller, Get, Param } from '@nestjs/common';
import { ServerReportInfraService } from './server-report-infra.service';
import { DateTimeUnit } from 'luxon';
import { ApiTags } from '@nestjs/swagger';
import { UserReportDto } from '../../domain/user-report/user-report.dto';

@ApiTags('Server Report')
@Controller('server-report-infra')
export class ServerReportInfraController {
  constructor(
    private readonly serverReportInfraService: ServerReportInfraService,
  ) {}

  @Get('time-period/:timePeriod')
  async get(
    @Param('timePeriod') timePeriod: DateTimeUnit,
  ): Promise<UserReportDto[]> {
    return this.serverReportInfraService.get(timePeriod);
  }
}
