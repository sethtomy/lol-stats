import { Module } from '@nestjs/common';
import { RiotProxyConfigService } from './riot-proxy-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [RiotProxyConfigService],
  exports: [RiotProxyConfigService],
})
export class RiotConfigModule {}
