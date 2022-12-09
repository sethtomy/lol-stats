export interface LeagueDtoOpts {
  queueType: string;
  tier: string;
  leaguePoints: number;
}

export class LeagueDto {
  queueType: string;

  tier: string;

  leaguePoints: number;

  constructor(opts: LeagueDtoOpts) {
    this.queueType = opts.queueType;
    this.tier = opts.tier;
    this.leaguePoints = opts.leaguePoints;
  }
}
