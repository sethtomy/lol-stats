import { Injectable } from '@nestjs/common';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { DateTime, DateTimeUnit } from 'luxon';
import { RiotMatchService } from '../riot/riot-match.service';

@Injectable()
/**
 * @todo Allow more regions.
 */
export class MatchService {
  constructor(private riotMatchService: RiotMatchService) {}

  // todo: add support for paging
  public async getByPuuid(
    puuid: string,
    period: DateTimeUnit,
  ): Promise<string[]> {
    // todo: add endTime?
    const start = DateTime.local().startOf(period).toSeconds();
    return this.riotMatchService.getByPuuid(puuid, start);
  }

  public async getById(
    matchId: string,
  ): Promise<RiotAPITypes.MatchV5.MatchDTO> {
    return this.riotMatchService.getById(matchId);
  }
}
