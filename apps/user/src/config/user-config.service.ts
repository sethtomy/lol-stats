import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  RIOT_PROXY_BASE_PATH = 'RIOT_PROXY_BASE_PATH',
}

@Injectable()
export class UserConfigService {
  constructor(private configService: ConfigService) {
    const RIOT_PROXY_BASE_PATH = this.configService.get<string>(
      ConfigKeys.RIOT_PROXY_BASE_PATH,
    );
    assert.ok(typeof RIOT_PROXY_BASE_PATH === 'string');
  }

  get RIOT_PROXY_BASE_PATH(): string {
    return this.configService.get<string>(ConfigKeys.RIOT_PROXY_BASE_PATH);
  }
}
