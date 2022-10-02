import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';
import { DateTimeUnit } from 'luxon';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('summoner/:puuid/time-period/:timePeriod')
  public async getByName(
    @Param('puuid') puuid: string,
    @Param('timePeriod') timePeriod: DateTimeUnit,
  ): Promise<string[]> {
    return this.matchService.getByPuuid(puuid, timePeriod);
  }

  @Get(':matchId')
  public async getById(@Param('matchId') matchId: string) {
    return this.matchService.getById(matchId);
  }
}
