import { Get, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserReportInfraService } from './user-report-infra.service';
import { DateTimeUnit } from 'luxon';

@Controller('user-report')
@ApiTags('User Report')
export class UserReportInfraController {
  constructor(private userReportInfraService: UserReportInfraService) {}

  @Get(':userName/time-period/:timePeriod')
  async get(
    @Param('userName') userName: string,
    @Param('timePeriod') timePeriod: DateTimeUnit,
  ) {
    return this.userReportInfraService.get(userName, timePeriod);
  }
}
