import { Injectable } from '@nestjs/common';
import SummonerReportDto from '../../infra/summoner-infra-report/models/summoner-report.dto';
import { UserReportDto } from './user-report.dto';
import ChampionReportDto from '../champion-report/champion-report.dto';
import { User } from '@sethtomy/user-client';
import { compareRanks, QueueType } from '@sethtomy/util';

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
  public get(user: User, summonerReports: SummonerReportDto[]): UserReportDto {
    const soloDuoLeagues = [];
    const flexLeagues = [];
    summonerReports.forEach((summonerReport) => {
      summonerReport.leagues.forEach((league) => {
        if (league.queueType === QueueType.SOLO_DUO) {
          soloDuoLeagues.push(league);
        }
        if (league.queueType === QueueType.FLEX) {
          flexLeagues.push(league);
        }
      });
    });
    const highestSoloDuoLeague = compareRanks(soloDuoLeagues);
    const highestFlexLeague = compareRanks(flexLeagues);
    return new UserReportDto({
      highestFlexLeague,
      highestSoloDuoLeague,
      userName: user.discordUserId,
      summoners: user.summonerNames,
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
