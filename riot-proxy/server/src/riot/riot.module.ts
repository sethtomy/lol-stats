import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import RiotClientService from './riot-client.service';
import { RiotConfigService } from './riot-config.service';
import { RiotSummonerService } from './riot-summoner.service';
import { RiotMatchService } from './riot-match.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    RiotClientService,
    RiotConfigService,
    RiotSummonerService,
    RiotMatchService,
  ],
  exports: [RiotSummonerService, RiotMatchService],
})
export class RiotModule {}
