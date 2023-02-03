import { Injectable, Logger } from '@nestjs/common';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { DateTime, DateTimeUnit } from 'luxon';
import { RiotMatchService } from '../riot/riot-match.service';
import { MatchDto } from './dto/match.dto';

@Injectable()
/**
 * @todo Allow more regions.
 */
export class MatchService {
  private readonly logger: Logger = new Logger(MatchService.name);

  constructor(private riotMatchService: RiotMatchService) {}

  // todo: add support for paging
  public async getByPuuid(
    puuid: string,
    period: DateTimeUnit,
  ): Promise<string[]> {
    // todo: add endTime?
    const start = DateTime.utc().minus({ hour: 5 }).startOf(period).toSeconds(); // EST
    const matchIds = await this.riotMatchService.getByPuuid(puuid, start);
    this.logger.log(`Successfully got matchIds for ${puuid}`);
    return matchIds;
  }

  public async getById(
    matchId: string,
  ): Promise<RiotAPITypes.MatchV5.MatchDTO> {
    const riotMatchDto = await this.riotMatchService.getById(matchId);
    return new MatchDto(riotMatchDto);
  }
}
