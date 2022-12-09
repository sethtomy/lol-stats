import { Injectable } from '@nestjs/common';
import { ServerReportDto } from './server-report.dto';
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
    const rate = userReportDto.wins / userReportDto.totalGames;
    if (Number.isNaN(rate)) {
      return 0;
    }
    return userReportDto.wins / userReportDto.totalGames;
  }

  private getHighestWinRate(userReports: UserReportDto[]): UserReportDto {
    const eligibleUserReports = userReports.filter(
      (userReport) => userReport.totalGames > 2,
    );
    const userReport = eligibleUserReports.reduce((a, b) => {
      const aWinRate = this.getWinRate(a);
      const bWinRate = this.getWinRate(b);
      // todo: Check how this behaves as users have less than 3 games
      if (aWinRate > bWinRate) {
        return a;
      }
      return b;
    });
    return userReport;
  }

  private getLowestWinRate(userReports: UserReportDto[]): UserReportDto {
    const eligibleUserReports = userReports.filter(
      (userReport) => userReport.totalGames > 2,
    );
    const userReport = eligibleUserReports.reduce((a, b) => {
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
