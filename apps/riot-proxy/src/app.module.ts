import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { SummonerModule } from './summoner/summoner.module';
import { RiotModule } from './riot/riot.module';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LeagueModule } from './league/league.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 100,
    }),
    ConfigModule.forRoot(),
    SummonerModule,
    RiotModule,
    MatchModule,
    LeagueModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
