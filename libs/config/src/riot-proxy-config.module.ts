import { Module } from '@nestjs/common';
import { RiotProxyConfigService } from '@sethtomy/config/riot-proxy-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [RiotProxyConfigService],
  exports: [RiotProxyConfigService],
})
export class RiotConfigModule {}
