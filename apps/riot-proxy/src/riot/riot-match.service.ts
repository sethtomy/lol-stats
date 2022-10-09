import { HttpException, Injectable } from '@nestjs/common';
import RiotClientService from './riot-client.service';
import { AbstractRiotCachedResourceService } from './abstract-riot-cached-resource.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import MatchType = RiotAPITypes.MatchV5.MatchType;

@Injectable()
export class RiotMatchService extends AbstractRiotCachedResourceService<RiotAPITypes.MatchV5.MatchDTO> {
  /**
   * 100 is the max
   * @link https://developer.riotgames.com/apis#match-v5/GET_getMatchIdsByPUUID
   */
  private readonly DEFAULT_COUNT = 100;

  constructor(private readonly riotClientService: RiotClientService) {
    super();
  }

  /**
   * This endpoint is intentionally not cached.
   * @startTime Epoch seconds.
   */
  public async getByPuuid(puuid: string, startTime: number): Promise<string[]> {
    // todo: add endTime?
    try {
      return await this.riotClientService.matchV5.getIdsbyPuuid({
        cluster: PlatformId.AMERICAS,
        puuid,
        params: {
          count: this.DEFAULT_COUNT,
          // todo: do I want to allow different types?
          type: MatchType.Ranked,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          startTime,
        },
      });
    } catch (error) {
      /**
       * @todo Replace this.
       */
      const httpError = error[Object.getOwnPropertySymbols(error)[1]];
      throw new HttpException(httpError, httpError.status);
    }
  }

  public async getById(
    matchId: string,
  ): Promise<RiotAPITypes.MatchV5.MatchDTO> {
    const requestBody = {
      cluster: PlatformId.AMERICAS,
      matchId,
    };
    const riotMatchDto = this.runAgainstCache(
      matchId,
      this.riotClientService.matchV5.getMatchById.bind(this),
      requestBody,
    );
    return riotMatchDto;
  }
}
