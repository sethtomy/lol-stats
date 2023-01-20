import AbstractReport, {
  AbstractReportOptions,
} from '../../common/AbstractReport';
import ChampionReportDto from '../champion-report/champion-report.dto';
import { LeagueDto } from '@sethtomy/riot-proxy-client';

interface UserReportDtoOptions extends AbstractReportOptions {
  userName: string;
  summoners: string[];
  championReports: ChampionReportDto[];
  highestSoloDuoLeague?: LeagueDto;
  highestFlexLeague?: LeagueDto;
}

export class UserReportDto extends AbstractReport {
  userName: string;
  summoners: string[];
  championReports: ChampionReportDto[];
  highestSoloDuoLeague?: LeagueDto;
  highestFlexLeague?: LeagueDto;

  constructor(options: UserReportDtoOptions) {
    super(options);
    this.userName = options.userName;
    this.summoners = options.summoners;
    this.championReports = options.championReports;
    this.highestSoloDuoLeague = options.highestSoloDuoLeague;
    this.highestFlexLeague = options.highestFlexLeague;
  }
}
