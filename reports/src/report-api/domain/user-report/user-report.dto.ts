import AbstractReport, {
  AbstractReportOptions,
} from '../../common/AbstractReport';
import ChampionReportDto from '../champion-report/champion-report.dto';

interface UserReportDtoOptions extends AbstractReportOptions {
  userName: string;
  summoners: string[];
  championReports: ChampionReportDto[];
}

export class UserReportDto extends AbstractReport {
  userName: string;
  summoners: string[];
  championReports: ChampionReportDto[];

  constructor(options: UserReportDtoOptions) {
    super(options);
    this.userName = options.userName;
    this.summoners = options.summoners;
    this.championReports = options.championReports;
  }
}
