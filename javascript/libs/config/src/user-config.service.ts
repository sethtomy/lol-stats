import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  USER_BASE_PATH = 'USER_BASE_PATH',
}

@Injectable()
export class UserConfigService {
  constructor(private configService: ConfigService) {
    const USER_BASE_PATH = this.configService.get<string>(
      ConfigKeys.USER_BASE_PATH,
    );
    assert.ok(typeof USER_BASE_PATH === 'string');
  }

  get USER_BASE_PATH(): string {
    return this.configService.get<string>(ConfigKeys.USER_BASE_PATH);
  }
}
