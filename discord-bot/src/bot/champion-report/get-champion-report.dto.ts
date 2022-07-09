import { Choice, Param, ParamType } from '@discord-nestjs/core';
import { TimePeriod } from '../../common/TimePeriod';
import { Champion } from '../../common/Champion';

export class GetChampionReportDto {
  @Choice(TimePeriod)
  @Param({
    name: 'time-period',
    description: 'Time period for the report.',
    type: ParamType.STRING,
    required: true,
  })
  timePeriod;

  @Choice(Champion)
  @Param({
    description: 'Champion for the report.',
    type: ParamType.STRING,
    required: true,
  })
  champion;
}
