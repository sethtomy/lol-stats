import { Injectable } from '@nestjs/common';
import RiotClient from '../riot/RiotClient';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import SummonerMapper from './models/summoner.mapper';
import SummonerDto from './models/summoner.dto';

@Injectable()
export class SummonerService {
  constructor(private riotClient: RiotClient) {}

  public async getByName(summonerName: string): Promise<SummonerDto> {
    const riotSummonerDto = await this.riotClient.summoner.getBySummonerName({
      region: PlatformId.NA1,
      summonerName,
    });
    return SummonerMapper.riotToResponse(riotSummonerDto);
  }
}
