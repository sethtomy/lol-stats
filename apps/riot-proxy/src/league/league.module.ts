import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { SummonerModule } from '../summoner/summoner.module';
import { RiotModule } from '../riot/riot.module';

@Module({
  imports: [SummonerModule, RiotModule],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
