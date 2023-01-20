import { Param, ParamType } from '@discord-nestjs/core';

export class SummonerDto {
  @Param({
    description: 'Summoner you would like to add to your user.',
    type: ParamType.STRING,
    required: true,
  })
  summoner;
}
