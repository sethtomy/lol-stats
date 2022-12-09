import { WinRateDto } from '../summoner-report/win-rate.dto';
import { UserReportDto } from '../user-report/user-report.dto';

interface ServerReportDtoOpts {
  lowestWinRate: UserReportDto;
  highestWinRate: UserReportDto;
}

export class ServerReportDto {
  lowestWinRate: WinRateDto;
  highestWinRate: WinRateDto;

  constructor(opts: ServerReportDtoOpts) {
    this.lowestWinRate = new WinRateDto(opts.lowestWinRate);
    this.highestWinRate = new WinRateDto(opts.highestWinRate);
  }
}
