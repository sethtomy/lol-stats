import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { DateTimeUnit } from 'luxon';
import { MatchDto } from './models/match.dto';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('summoner/:puuid/time-period/:timePeriod')
  @ApiParam({ name: 'puuid' })
  @ApiParam({ name: 'timePeriod' })
  public async getByPuuid(
    @Param('puuid') puuid: string,
    @Param('timePeriod') timePeriod: DateTimeUnit,
  ): Promise<string[]> {
    return this.matchService.getByPuuid(puuid, timePeriod);
  }

  @Get(':matchId')
  @ApiOkResponse({
    type: MatchDto,
  })
  public async getById(@Param('matchId') matchId: string): Promise<MatchDto> {
    return this.matchService.getById(matchId);
  }
}
