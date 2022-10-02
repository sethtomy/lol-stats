import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import RiotClientService from './riot-client.service';
import { RiotConfigService } from './riot-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [RiotClientService, RiotConfigService],
  exports: [RiotClientService],
})
export class RiotModule {}
