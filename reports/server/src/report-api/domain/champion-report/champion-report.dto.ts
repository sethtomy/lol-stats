import AbstractReport, {
  AbstractReportOptions,
} from '../../common/AbstractReport';

interface ChampionReportDtoOptions extends AbstractReportOptions {
  championName: string;
}

export default class ChampionReportDto extends AbstractReport {
  championName: string;

  constructor(options: ChampionReportDtoOptions) {
    super(options);
    this.championName = options.championName;
  }
}
