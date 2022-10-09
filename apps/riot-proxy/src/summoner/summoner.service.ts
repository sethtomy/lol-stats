import { Injectable } from '@nestjs/common';
import SummonerMapper from './models/summoner.mapper';
import SummonerDto from './models/summoner.dto';
import { RiotSummonerService } from '../riot/riot-summoner.service';

@Injectable()
export class SummonerService {
  constructor(private riotSummonerService: RiotSummonerService) {}

  public async getByName(summonerName: string): Promise<SummonerDto> {
    const riotSummonerDto = await this.riotSummonerService.getSummonerByName(
      summonerName,
    );
    return SummonerMapper.riotToResponse(riotSummonerDto);
  }
}
