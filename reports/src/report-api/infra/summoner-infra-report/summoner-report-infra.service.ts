import { Injectable } from '@nestjs/common';
import { MatchService } from '../../../riot-api/match/match.service';
import { SummonerService } from '../../../riot-api/summoner/summoner.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import SummonerReportDto from './models/summoner-report.dto';
import { DateTimeUnit } from 'luxon';
import AbstractReportService from '../../domain/AbstractReportService';
import { ChampionReportService } from '../../domain/champion-report/champion-report.service';
import { SummonerReportService } from '../../domain/summoner-report/summoner-report.service';

@Injectable()
export class SummonerReportInfraService extends AbstractReportService {
  constructor(
    private readonly matchService: MatchService,
    private readonly summonerService: SummonerService,
    private readonly championReportService: ChampionReportService,
    private readonly summonerReportService: SummonerReportService,
  ) {
    super();
  }

  public async getSummonerReportByPeriod(
    summonerName: string,
    period: DateTimeUnit,
  ): Promise<SummonerReportDto> {
    const { puuid } = await this.summonerService.getByName(summonerName);
    // todo: remove hardcoded period
    const matchIds = await this.matchService.getByPuuid(puuid, period);
    const participantDTOS = await this.getAllMatchesFilterParticipant(
      puuid,
      matchIds,
    );
    return this.summonerReportService.get(summonerName, participantDTOS);
  }

  private async getAllMatchesFilterParticipant(
    puuid: string,
    matchIds: string[],
  ): Promise<RiotAPITypes.MatchV5.ParticipantDTO[]> {
    const matches: RiotAPITypes.MatchV5.ParticipantDTO[] = [];
    for (const matchId of matchIds) {
      const match = await this.matchService.getById(matchId);
      const filtered = match.info.participants.find(
        (participant) => participant.puuid === puuid,
      );
      matches.push(filtered);
    }
    return matches;
  }
}
