import { Injectable } from '@nestjs/common';
import { ChampionReportService } from '../champion-report/champion-report.service';
import AbstractReportService from '../AbstractReportService';
import SummonerReportDto from '../../infra/summoner-infra-report/models/summoner-report.dto';
import { ParticipantDto } from '@sethtomy/riot-proxy-client';

@Injectable()
export class SummonerReportService extends AbstractReportService {
  constructor(private readonly championReportService: ChampionReportService) {
    super();
  }

  get(summonerName: string, participantDtos: ParticipantDto[]) {
    return new SummonerReportDto({
      wins: AbstractReportService.getTotalWins(participantDtos),
      totalGames: AbstractReportService.getTotalGames(participantDtos),
      summonerName,
      championReports: this.championReportService.getMany(participantDtos),
    });
  }
}
