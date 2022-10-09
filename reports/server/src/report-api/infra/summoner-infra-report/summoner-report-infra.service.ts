import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { MatchService } from '../../../../../../apps/riot-proxy/src/match/match.service';
import { SummonerService } from '../../../../../../apps/riot-proxy/src/summoner/summoner.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import SummonerReportDto from './models/summoner-report.dto';
import { DateTimeUnit } from 'luxon';
import AbstractReportService from '../../domain/AbstractReportService';
import { ChampionReportService } from '../../domain/champion-report/champion-report.service';
import { SummonerReportService } from '../../domain/summoner-report/summoner-report.service';
import ChampionReportDto from '../../domain/champion-report/champion-report.dto';

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
    timePeriod: DateTimeUnit,
  ): Promise<SummonerReportDto> {
    const { puuid } = await this.summonerService.getByName(summonerName);
    const matchIds = await this.matchService.getByPuuid(puuid, timePeriod);
    const participantDTOS = await this.getAllMatchesFilterParticipant(
      puuid,
      matchIds,
    );
    return this.summonerReportService.get(summonerName, participantDTOS);
  }

  @Get(':summonerName/champion/:championName/time-period/:timePeriod')
  public async getSummonerReportByPeriodAndChampion(
    summonerName: string,
    championName: string,
    timePeriod: DateTimeUnit,
  ): Promise<ChampionReportDto> {
    const summonerReportDto = await this.getSummonerReportByPeriod(
      summonerName,
      timePeriod,
    );
    // todo: some validation on champion name
    const championReport = summonerReportDto.championReports.find(
      (championReport) => {
        console.log(championReport.championName);
        return championReport.championName === championName;
      },
    );
    if (!championReport) {
      throw new NotFoundException(
        `Report for ${summonerName} not found in last ${timePeriod}.`,
      );
    }
    return championReport;
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
