export interface AbstractReportOptions {
  wins: number;
  totalGames: number;
}

// todo: add to-from date?
// todo: add description to state time period
export default abstract class AbstractReport {
  public winRate: string;
  public wins: number;
  public totalGames: number;

  protected constructor(options: AbstractReportOptions) {
    this.wins = options.wins;
    this.totalGames = options.totalGames;
    this.setWinRate();
  }

  public setWinRate(): void {
    let winRate: number;
    if (this.totalGames === 0) {
      winRate = 0;
    } else {
      winRate = (100 * this.wins) / this.totalGames;
    }
    this.winRate = `${winRate.toFixed(1)}%`;
  }
}
