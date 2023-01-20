import { Injectable } from '@nestjs/common';
import { UserReportDto } from '../user-report/user-report.dto';

@Injectable()
export class ServerReportService {
  get(userReports: UserReportDto[]): UserReportDto[] {
    userReports = userReports.filter((userReport) => userReport.totalGames > 2);
    const serverReport = userReports.sort(
      ServerReportService.compareUserReports,
    );
    return serverReport;
  }

  private static compareUserReports(a: UserReportDto, b: UserReportDto) {
    const aWinRate = ServerReportService.getWinRate(a);
    const bWinRate = ServerReportService.getWinRate(b);
    return bWinRate - aWinRate;
  }

  private static getWinRate(userReportDto: UserReportDto) {
    const rate = userReportDto.wins / userReportDto.totalGames;
    if (Number.isNaN(rate)) {
      return 0;
    }
    return userReportDto.wins / userReportDto.totalGames;
  }
}
