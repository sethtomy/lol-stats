import { Injectable } from '@nestjs/common';
import ChampionReportDto from './champion-report.dto';
import AbstractReportService from '../AbstractReportService';
import { ParticipantDto } from '@sethtomy/riot-proxy-client';

@Injectable()
export class ChampionReportService extends AbstractReportService {
  /**
   * @param participantDtos - These DTOs ARE for the given summoner
   */
  public getMany(participantDtos: ParticipantDto[]): ChampionReportDto[] {
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
    participantDtos: ParticipantDto[],
  ): Record<string, ParticipantDto[]> {
    const map: Record<string, ParticipantDto[]> = {};
    participantDtos.forEach((participantDto) => {
      if (!map[participantDto.championName]) {
        map[participantDto.championName] = [];
      }
      map[participantDto.championName].push(participantDto);
    });
    return map;
  }
}
