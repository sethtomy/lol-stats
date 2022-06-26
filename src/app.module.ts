import { Module } from '@nestjs/common';
import { SummonerModule } from './summoner/summoner.module';
import { RiotModule } from './riot/riot.module';

@Module({
  imports: [SummonerModule, RiotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
