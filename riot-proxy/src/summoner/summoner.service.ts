import { Injectable } from '@nestjs/common';
import RiotClientService from '../riot/riot-client.service';
import SummonerMapper from './models/summoner.mapper';
import SummonerDto from './models/summoner.dto';

@Injectable()
export class SummonerService {
  constructor(private riotClient: RiotClientService) {}

  public async getByName(summonerName: string): Promise<SummonerDto> {
    const riotSummonerDto = await this.riotClient.getSummonerByName(
      summonerName,
    );
    return SummonerMapper.riotToResponse(riotSummonerDto);
  }
}
