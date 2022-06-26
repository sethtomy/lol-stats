import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';
import { RiotModule } from '../riot/riot.module';

@Module({
  imports: [RiotModule],
  exports: [SummonerService],
  controllers: [SummonerController],
  providers: [SummonerService],
})
export class SummonerModule {}
