import { Controller, Get, Param } from '@nestjs/common';
import { LeagueService } from './league.service';
import { ApiTags } from '@nestjs/swagger';
import { LeagueDto } from './league.dto';

@ApiTags('League')
@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Get(':id')
  public getByName(@Param('id') id: string): Promise<LeagueDto[]> {
    return this.leagueService.getByName(id);
  }
}
