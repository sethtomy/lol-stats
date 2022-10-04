import { Injectable } from '@nestjs/common';
import { RiotAPITypes } from '@fightmegg/riot-api';
import ChampionReportDto from './champion-report.dto';
import AbstractReportService from '../AbstractReportService';

@Injectable()
export class ChampionReportService extends AbstractReportService {
  /**
   * @param participantDtos - These DTOs ARE for the given summoner
   */
  public getMany(
    participantDtos: RiotAPITypes.MatchV5.ParticipantDTO[],
  ): ChampionReportDto[] {
    const map = this.categorizeByChampion(participantDtos);
    const championReportDtos: ChampionReportDto[] = [];
    Object.entries(map).forEach(([championName, championParticipantDtos]) => {
      championReportDtos.push(
        new ChampionReportDto({
          championName,
          wins: AbstractReportService.getTotalWins(championParticipantDtos),
          totalGames: AbstractReportService.getTotalGames(
            championParticipantDtos,
          ),
        }),
      );
    });
    return championReportDtos;
  }

  private categorizeByChampion(
    participantDtos: RiotAPITypes.MatchV5.ParticipantDTO[],
  ): Record<string, RiotAPITypes.MatchV5.ParticipantDTO[]> {
    const map: Record<string, RiotAPITypes.MatchV5.ParticipantDTO[]> = {};
    participantDtos.forEach((participantDto) => {
      if (!map[participantDto.championName]) {
        map[participantDto.championName] = [];
      }
      map[participantDto.championName].push(participantDto);
    });
    return map;
  }
}
