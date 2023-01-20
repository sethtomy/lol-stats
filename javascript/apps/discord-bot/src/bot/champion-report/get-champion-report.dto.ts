import { Param, ParamType } from '@discord-nestjs/core';
import { TimeReportDto } from '../common/time-report.dto';

export class GetChampionReportDto extends TimeReportDto {
  @Param({
    description: 'Champion for the report.',
    type: ParamType.STRING,
    required: true,
  })
  champion;
}
