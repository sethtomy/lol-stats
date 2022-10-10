import { Module } from '@nestjs/common';
import { RiotProxyConfigService } from '@sethtomy/config/riot-proxy-config.service';
import { ConfigModule } from '@nestjs/config';
import { UserConfigService } from '@sethtomy/config/user-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [RiotProxyConfigService, UserConfigService],
  exports: [RiotProxyConfigService, UserConfigService],
})
export class CommonConfigModule {}
