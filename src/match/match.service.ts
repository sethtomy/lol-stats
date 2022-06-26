import { Injectable } from '@nestjs/common';
import RiotClient from '../riot/RiotClient';
import { PlatformId } from '@fightmegg/riot-rate-limiter';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { DateTime } from 'luxon';
import MatchType = RiotAPITypes.MatchV5.MatchType;

@Injectable()
export class MatchService {
  DEFAULT_COUNT = 100;

  constructor(private riotClient: RiotClient) {}

  public async getBySummoner(puuid: string) {
    // todo: Remove hardcoded dates
    const start = DateTime.local().startOf('week').toSeconds();
    console.log(start);
    // todo: allow more regions
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
}
