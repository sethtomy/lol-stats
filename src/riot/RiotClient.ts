import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotAPI } from '@fightmegg/riot-api';

@Injectable()
export default class RiotClient extends RiotAPI {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(configService: ConfigService) {
    // const RIOT_API_KEY = configService.get<string>('RIOT_API_KEY');
    // todo: figure out how to inject config
    super('RGAPI-b2e5b19d-e133-4deb-81b2-d15920370ded');
  }
}
