import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  DATABASE_HOST = 'DATABASE_HOST',
}

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {
    const DATABASE_HOST = this.configService.get<string>(
      ConfigKeys.DATABASE_HOST,
    );
    assert.ok(typeof DATABASE_HOST === 'string');
  }

  get DATABASE_HOST(): string {
    return this.configService.get<string>(ConfigKeys.DATABASE_HOST);
  }
}
