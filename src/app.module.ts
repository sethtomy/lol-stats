import { Module } from '@nestjs/common';
import { SummonerModule } from './summoner/summoner.module';
import { RiotModule } from './riot/riot.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [SummonerModule, RiotModule, MatchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
