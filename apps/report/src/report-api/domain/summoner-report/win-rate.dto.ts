import { UserReportDto } from '@sethtomy/report-client';

export class WinRateDto {
  public winRate: string;

  public userName: string;

  constructor(userReportDto: UserReportDto) {
    this.winRate = userReportDto.winRate;
    this.userName = userReportDto.userName;
  }
}
