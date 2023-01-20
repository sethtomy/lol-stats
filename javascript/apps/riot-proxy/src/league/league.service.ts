import { Injectable } from '@nestjs/common';
import { RiotLeagueService } from '../riot/riot-league.service';
import { LeagueDto } from './league.dto';

@Injectable()
export class LeagueService {
  constructor(private riotLeagueService: RiotLeagueService) {}

  public async getByName(id: string): Promise<LeagueDto[]> {
    const leagueEntryDTOS = await this.riotLeagueService.getBySummoner(id);
    return leagueEntryDTOS.map(
      (leagueEntryDTO) => new LeagueDto(leagueEntryDTO),
    );
  }
}
