import { Injectable, Logger } from '@nestjs/common';
import RiotClientService from './riot-client.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import { AbstractRiotCachedResourceService } from './abstract-riot-cached-resource.service';

@Injectable()
export class RiotSummonerService extends AbstractRiotCachedResourceService<RiotAPITypes.Summoner.SummonerDTO> {
  private readonly logger: Logger = new Logger(RiotSummonerService.name);

  constructor(private readonly riotClientService: RiotClientService) {
    super();
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
