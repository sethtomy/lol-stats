import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordConfigService } from './discord-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DiscordConfigService],
  exports: [DiscordConfigService],
})
export class DiscordConfigModule {}
