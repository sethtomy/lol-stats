import { Injectable } from '@nestjs/common';
import { RiotLeagueService } from '../riot/riot-league.service';
import { SummonerService } from '../summoner/summoner.service';
import { LeagueDto } from './league.dto';

@Injectable()
export class LeagueService {
  constructor(
    private riotLeagueService: RiotLeagueService,
    private readonly summonerService: SummonerService,
  ) {}

  public async getByName(summonerName: string): Promise<LeagueDto[]> {
    const summonerDto = await this.summonerService.getByName(summonerName);
    const leagueEntryDTOS = await this.riotLeagueService.getBySummoner(
      summonerDto,
    );
    return leagueEntryDTOS.map(
      (leagueEntryDTO) => new LeagueDto(leagueEntryDTO),
    );
  }
}
