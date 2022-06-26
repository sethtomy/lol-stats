interface SummonerOptions {
  puuid: string;
}

export default class SummonerDto {
  puuid: string;

  constructor(options: SummonerOptions) {
    this.puuid = options.puuid;
  }
}
