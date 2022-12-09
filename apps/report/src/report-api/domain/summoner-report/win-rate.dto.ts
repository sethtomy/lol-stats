import { UserReportDto } from '../user-report/user-report.dto';

export class WinRateDto {
  public winRate: string;

  public userName: string;

  constructor(userReportDto: UserReportDto) {
    this.winRate = userReportDto.winRate;
    this.userName = userReportDto.userName;
  }
}
