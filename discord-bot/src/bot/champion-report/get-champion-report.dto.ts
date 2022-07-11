import { Choice, Param, ParamType } from '@discord-nestjs/core';
import { TimePeriod } from '../../common/TimePeriod';

export class GetChampionReportDto {
  @Choice(TimePeriod)
  @Param({
    name: 'time-period',
    description: 'Time period for the report.',
    type: ParamType.STRING,
    required: true,
  })
  timePeriod;

  @Param({
    description: 'Champion for the report.',
    type: ParamType.STRING,
    required: true,
  })
  champion;
}
