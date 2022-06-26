interface SummonerReportDtoOptions {
  wins: number;
  totalGames: number;
}

// todo: add to-from date?
// todo: add description to state time period
export default class SummonerReportDto {
  public winRate: string;
  public wins: number;
  public totalGames: number;

  constructor(options: SummonerReportDtoOptions) {
    this.wins = options.wins;
    this.totalGames = options.totalGames;
    this.setWinRate();
  }

  private setWinRate(): void {
    const winRate = (100 * this.wins) / this.totalGames;
    this.winRate = `${winRate}%`;
  }
}
