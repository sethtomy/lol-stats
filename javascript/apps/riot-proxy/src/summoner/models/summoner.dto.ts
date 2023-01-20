interface SummonerOptions {
  puuid: string;
  id: string;
}

export default class SummonerDto {
  puuid: string;

  id: string;

  constructor(options: SummonerOptions) {
    this.puuid = options.puuid;
    this.id = options.id;
  }
}
