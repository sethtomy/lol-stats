import { Controller, Get, Param } from '@nestjs/common';
import { LeagueService } from './league.service';
import { ApiTags } from '@nestjs/swagger';
import { LeagueDto } from './league.dto';

@ApiTags('League')
@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Get(':name')
  public getByName(@Param('name') name: string): Promise<LeagueDto[]> {
    return this.leagueService.getByName(name);
  }
}
