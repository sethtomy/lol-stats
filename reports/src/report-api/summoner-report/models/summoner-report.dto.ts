import AbstractReport, {
  AbstractReportOptions,
} from '../../common/AbstractReport';
import ChampionReportDto from '../../domain/champion-report/champion-report.dto';

interface SummonerReportDtoOptions extends AbstractReportOptions {
  summonerName: string;
  championReports: ChampionReportDto[];
}

// todo: add to-from date?
// todo: add description to state time period
export default class SummonerReportDto extends AbstractReport {
  public summonerName: string;
  public championReports: ChampionReportDto[];

  constructor(options: SummonerReportDtoOptions) {
    super(options);
    this.summonerName = options.summonerName;
    this.championReports = options.championReports;
  }
}
