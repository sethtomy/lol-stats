import { Injectable } from '@nestjs/common';
import RiotClient from '../riot/RiotClient';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import { RiotAPITypes } from '@fightmegg/riot-api';
import SummonerDTO = RiotAPITypes.Summoner.SummonerDTO;

@Injectable()
export class SummonerService {
  constructor(private riotClient: RiotClient) {}

  public async getByName(summonerName: string): Promise<SummonerDTO> {
    // todo mapper
    return this.riotClient.summoner.getBySummonerName({
      region: PlatformId.NA1,
      summonerName,
    });
  }
}
