import { Injectable } from '@nestjs/common';
import RiotClientService from './riot-client.service';
import { PlatformId, RiotAPITypes } from '@fightmegg/riot-api';
import { AbstractRiotCachedResourceService } from './abstract-riot-cached-resource.service';
import LeagueEntryDTO = RiotAPITypes.League.LeagueEntryDTO;

@Injectable()
export class RiotLeagueService extends AbstractRiotCachedResourceService<RiotAPITypes.Summoner.SummonerDTO> {
  constructor(private readonly riotClientService: RiotClientService) {
    super();
  }

  async getBySummoner(id: string): Promise<LeagueEntryDTO[]> {
    return this.riotClientService.league.getEntriesBySummonerId({
      region: PlatformId.NA1,
      summonerId: id,
    });
  }
}
