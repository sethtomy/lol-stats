import { Module } from '@nestjs/common';
import { SummonerModule } from './summoner/summoner.module';
import { RiotModule } from './riot/riot.module';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';

@Module({
  imports: [ConfigModule.forRoot(), SummonerModule, RiotModule, MatchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
