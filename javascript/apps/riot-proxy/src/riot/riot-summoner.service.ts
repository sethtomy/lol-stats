import { Injectable, Logger } from '@nestjs/common';
import RiotClientService from './riot-client.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import { AbstractRiotCachedResourceService } from './abstract-riot-cached-resource.service';
import { Repository } from 'typeorm';
import { Summoner } from './db/summoner';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RiotSummonerService extends AbstractRiotCachedResourceService<RiotAPITypes.Summoner.SummonerDTO> {
  private readonly logger: Logger = new Logger(RiotSummonerService.name);

  constructor(
    private readonly riotClientService: RiotClientService,
    @InjectRepository(Summoner)
    summonerRepository: Repository<Summoner>,
  ) {
    super(summonerRepository);
  }

  async getSummonerByName(summonerName: string) {
    const requestBody = {
      region: PlatformId.NA1,
      summonerName,
    };
    const riotSummonerDto = await this.runAgainstCache(
      summonerName,
      this.riotClientService.summoner.getBySummonerName,
      requestBody,
    );
    this.logger.log(`Successful GET request to Summoner '${summonerName}'`);
    return riotSummonerDto;
  }
}
