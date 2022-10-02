import { Injectable } from '@nestjs/common';
import RiotClientService from '../../../../riot-proxy/src/riot/riot-client.service';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { DateTime, DateTimeUnit } from 'luxon';
import MatchType = RiotAPITypes.MatchV5.MatchType;

@Injectable()
// todo: allow more regions
export class MatchService {
  DEFAULT_COUNT = 100;

  constructor(private riotClient: RiotClientService) {}

  // todo: add support for paging
  public async getByPuuid(
    puuid: string,
    period: DateTimeUnit,
  ): Promise<string[]> {
    // todo: add endTime?
    const start = DateTime.local().startOf(period).toSeconds();
    return this.riotClient.matchV5.getIdsbyPuuid({
      cluster: PlatformId.AMERICAS,
      puuid,
      params: {
        count: this.DEFAULT_COUNT,
        // todo: do I want to allow different types?
        type: MatchType.Ranked,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        startTime: start,
      },
    });
  }

  public async getById(
    matchId: string,
  ): Promise<RiotAPITypes.MatchV5.MatchDTO> {
    return this.riotClient.matchV5.getMatchById({
      cluster: PlatformId.AMERICAS,
      matchId,
    });
  }
}
