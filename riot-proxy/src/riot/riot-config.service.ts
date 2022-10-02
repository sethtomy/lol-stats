import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  RIOT_API_KEY = 'RIOT_API_KEY',
}

@Injectable()
export class RiotConfigService {
  constructor(private configService: ConfigService) {
    const RIOT_API_KEY = this.configService.get<string>(
      ConfigKeys.RIOT_API_KEY,
    );
    assert.ok(typeof RIOT_API_KEY === 'string');
  }

  get RIOT_API_KEY(): string {
    return this.configService.get<string>(ConfigKeys.RIOT_API_KEY);
  }
}
