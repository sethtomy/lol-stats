import { Injectable } from '@nestjs/common';
import { ServerReportDto } from '../summoner-report/server-report.dto';
import { UserReportDto } from '../user-report/user-report.dto';

@Injectable()
export class ServerReportService {
  get(userReports: UserReportDto[]) {
    const lowestWinRate = this.getLowestWinRate(userReports);
    const highestWinRate = this.getHighestWinRate(userReports);
    return new ServerReportDto({
      highestWinRate,
      lowestWinRate,
    });
  }

  private getWinRate(userReportDto: UserReportDto) {
    return userReportDto.wins / userReportDto.totalGames;
  }

  private getHighestWinRate(userReports: UserReportDto[]): UserReportDto {
    const userReport = userReports.reduce((a, b) => {
      const aWinRate = this.getWinRate(a);
      const bWinRate = this.getWinRate(b);
      // todo: Check how this behaves as users have less than 3 games
      if (aWinRate > bWinRate) {
        if (a.totalGames > 2) {
          return a;
        }
      }
      return b;
    });
    return userReport;
  }

  private getLowestWinRate(userReports: UserReportDto[]): UserReportDto {
    const userReport = userReports.reduce((a, b) => {
      const aWinRate = this.getWinRate(a);
      const bWinRate = this.getWinRate(b);
      if (aWinRate < bWinRate) {
        return a;
      }
      return b;
    });
    return userReport;
  }
}
