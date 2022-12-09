import { Choice, Param, ParamType } from '@discord-nestjs/core';
import { TimePeriod } from '../../common/TimePeriod';

export class TimeReportDto {
  @Choice(TimePeriod)
  @Param({
    name: 'time-period',
    description: 'Time period for the report.',
    type: ParamType.STRING,
    required: true,
  })
  timePeriod: string;
}
