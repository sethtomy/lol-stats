import { Injectable } from '@nestjs/common';
import RiotClientService from './riot-client.service';
import { PlatformId, RiotAPITypes } from '@fightmegg/riot-api';
import LeagueEntryDTO = RiotAPITypes.League.LeagueEntryDTO;

@Injectable()
export class RiotLeagueService {
  constructor(private readonly riotClientService: RiotClientService) {}

  async getBySummoner(id: string): Promise<LeagueEntryDTO[]> {
    return this.riotClientService.league.getEntriesBySummonerId({
      region: PlatformId.NA1,
      summonerId: id,
    });
  }
}
