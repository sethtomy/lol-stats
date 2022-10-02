import { Injectable } from '@nestjs/common';
import { RiotAPI, RiotAPITypes } from '@fightmegg/riot-api';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import { RiotConfigService } from './riot-config.service';

@Injectable()
export default class RiotClientService extends RiotAPI {
  /**
   * @todo Replace all the below with MongoDB
   */
  private readonly summonerMap: Record<
    string,
    RiotAPITypes.Summoner.SummonerDTO
  >;

  constructor(riotConfigService: RiotConfigService) {
    super(riotConfigService.RIOT_API_KEY);
    this.summonerMap = {};
  }

  async getSummonerByName(summonerName: string) {
    let riotSummonerDto = this.summonerMap[summonerName];
    if (!riotSummonerDto) {
      riotSummonerDto = await this.summoner.getBySummonerName({
        region: PlatformId.NA1,
        summonerName,
      });
      this.summonerMap[summonerName] = riotSummonerDto;
    }
    return riotSummonerDto;
  }
}
