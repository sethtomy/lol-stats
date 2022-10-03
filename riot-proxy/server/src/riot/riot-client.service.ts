import { Injectable } from '@nestjs/common';
import { RiotAPI } from '@fightmegg/riot-api';
import { RiotConfigService } from './riot-config.service';

@Injectable()
export default class RiotClientService extends RiotAPI {
  constructor(riotConfigService: RiotConfigService) {
    super(riotConfigService.RIOT_API_KEY);
  }
}
