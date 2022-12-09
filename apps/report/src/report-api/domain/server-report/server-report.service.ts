import { Injectable } from '@nestjs/common';
import { UserReportDto } from '@sethtomy/report-client';

@Injectable()
export class ServerReportService {
  get(userReports: UserReportDto[]) {
    const lowestWinRate = this.getLowestWinRate(userReports);
    const highestWinRate = this.getHighestWinRate(userReports);
    return {
      lowestWinRate: {
        user: lowestWinRate.userName,
        winRate: this.getWinRate(lowestWinRate),
      },
      highestWinRate: {
        user: highestWinRate.userName,
        winRate: this.getWinRate(highestWinRate),
      },
    };
  }

  private getWinRate(userReportDto: UserReportDto) {
    return userReportDto.wins / userReportDto.totalGames;
  }

  private getHighestWinRate(userReports: UserReportDto[]): UserReportDto {
    const userReport = userReports.reduce((a, b) => {
      const aWinRate = this.getWinRate(a);
      const bWinRate = this.getWinRate(b);
      if (aWinRate > bWinRate) {
        return a;
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
