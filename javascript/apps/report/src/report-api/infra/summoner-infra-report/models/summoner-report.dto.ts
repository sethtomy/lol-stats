import AbstractReport, {
  AbstractReportOptions,
} from '../../../common/AbstractReport';
import ChampionReportDto from '../../../domain/champion-report/champion-report.dto';
import { LeagueDto } from '@sethtomy/riot-proxy-client';

interface SummonerReportDtoOptions extends AbstractReportOptions {
  summonerName: string;
  championReports: ChampionReportDto[];
  leagues: LeagueDto[];
}

// todo: add to-from date?
// todo: add description to state time period
export default class SummonerReportDto extends AbstractReport {
  public summonerName: string;
  public championReports: ChampionReportDto[];
  public leagues: LeagueDto[];

  constructor(options: SummonerReportDtoOptions) {
    super(options);
    this.summonerName = options.summonerName;
    this.championReports = options.championReports;
    this.leagues = options.leagues;
  }
}
