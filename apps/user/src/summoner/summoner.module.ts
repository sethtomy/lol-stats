import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';

@Module({
  controllers: [SummonerController],
  providers: [SummonerService]
})
export class SummonerModule {}
