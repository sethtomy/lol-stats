import { Injectable } from '@nestjs/common';
import { MatchService } from '../match/match.service';
import { SummonerService } from '../summoner/summoner.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import SummonerReportDto from './models/summoner-report.dto';
import { DateTimeUnit } from 'luxon';

@Injectable()
export class SummonerReportService {
  constructor(
    private readonly matchService: MatchService,
    private readonly summonerService: SummonerService,
  ) {}

  public async getSummonerReportByPeriod(
    summonerName: string,
    period: DateTimeUnit,
  ): Promise<SummonerReportDto> {
    const { puuid } = await this.summonerService.getByName(summonerName);
    // todo: remove hardcoded period
    const matchIds = await this.matchService.getByPuuid(puuid, period);
    const matches = await this.getAllMatchesFilterParticipant(puuid, matchIds);
    const wins = SummonerReportService.getTotalWins(matches);
    return new SummonerReportDto({
      wins,
      totalGames: matchIds.length,
    });
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

  private static getTotalWins(
    participantDtos: RiotAPITypes.MatchV5.ParticipantDTO[],
  ): number {
    let wins = 0;
    participantDtos.forEach((participantDto) => {
      if (participantDto.win) {
        wins++;
      }
    });
    return wins;
  }
}
