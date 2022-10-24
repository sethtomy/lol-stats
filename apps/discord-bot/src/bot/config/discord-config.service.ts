import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  SERVER_ID = 'SERVER_ID',
  DISCORD_BOT_TOKEN = 'DISCORD_BOT_TOKEN',
}

@Injectable()
export class DiscordConfigService {
  constructor(private configService: ConfigService) {
    const SERVER_ID = this.configService.get<string>(ConfigKeys.SERVER_ID);
    assert.ok(typeof SERVER_ID === 'string');
    const DISCORD_BOT_TOKEN = this.configService.get<string>(
      ConfigKeys.DISCORD_BOT_TOKEN,
    );
    assert.ok(typeof DISCORD_BOT_TOKEN === 'string');
  }

  get SERVER_ID(): string {
    return this.configService.get<string>(ConfigKeys.SERVER_ID);
  }

  get DISCORD_BOT_TOKEN(): string {
    return this.configService.get<string>(ConfigKeys.DISCORD_BOT_TOKEN);
  }
}
