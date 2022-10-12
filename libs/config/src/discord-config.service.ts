import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  DISCORD_BOT_TOKEN = 'DISCORD_BOT_TOKEN',
}

@Injectable()
export class DiscordConfigService {
  constructor(private configService: ConfigService) {
    const DISCORD_BOT_TOKEN = this.configService.get<string>(
      ConfigKeys.DISCORD_BOT_TOKEN,
    );
    assert.ok(typeof DISCORD_BOT_TOKEN === 'string');
  }

  get DISCORD_BOT_TOKEN(): string {
    return this.configService.get<string>(ConfigKeys.DISCORD_BOT_TOKEN);
  }
}
