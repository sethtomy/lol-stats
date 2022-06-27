import { Injectable } from '@nestjs/common';
import SummonerReportDto from '../../infra/summoner-infra-report/models/summoner-report.dto';
import { UserReportDto } from './user-report.dto';
import { UserDto } from '../../../user-api/dto/user.dto';
import ChampionReportDto from '../champion-report/champion-report.dto';

function compare(a: ChampionReportDto, b: ChampionReportDto) {
  if (a.totalGames < b.totalGames) {
    return 1;
  }
  if (a.totalGames > b.totalGames) {
    return -1;
  }
  return 0;
}

@Injectable()
export class UserReportService {
  public get(
    user: UserDto,
    summonerReports: SummonerReportDto[],
  ): UserReportDto {
    return new UserReportDto({
      userName: user.name,
      summoners: user.summoners,
      wins: this.getWins(summonerReports),
      totalGames: this.getTotalGames(summonerReports),
      championReports: this.getChampionReports(summonerReports),
    });
  }

  private getWins(summonerReports: SummonerReportDto[]): number {
    let wins = 0;
    summonerReports.forEach((summonerReport) => {
      wins += summonerReport.wins;
    });
    return wins;
  }

  private getTotalGames(summonerReports: SummonerReportDto[]): number {
    let count = 0;
    summonerReports.forEach((summonerReport) => {
      count += summonerReport.totalGames;
    });
    return count;
  }

  private getChampionReports(
    summonerReports: SummonerReportDto[],
  ): ChampionReportDto[] {
    const championReportMap: Record<string, ChampionReportDto> = {};
    summonerReports.forEach((summonerReport) => {
      summonerReport.championReports.forEach((championReport) => {
        if (!championReportMap[championReport.championName]) {
          championReportMap[championReport.championName] = championReport;
        } else {
          const current = championReportMap[championReport.championName];
          current.wins += championReport.wins;
          current.totalGames += championReport.totalGames;
          current.setWinRate();
        }
      });
    });
    const championReports = Object.values(championReportMap);
    return championReports.sort(compare);
  }
}
