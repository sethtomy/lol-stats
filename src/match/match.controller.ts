import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('summoner/:puuid')
  public getByName(@Param('puuid') puuid: string) {
    return this.matchService.getBySummoner(puuid);
  }
}
