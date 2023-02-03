import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { SummonerModule } from './summoner/summoner.module';
import { RiotModule } from './riot/riot.module';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LeagueModule } from './league/league.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootConfig } from './config';
import { DatabaseConfig } from '@sethtomy/config';
import * as path from 'path';

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
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: dotenvLoader({
        separator: '__',
        envFilePath: path.join(process.cwd(), 'apps', 'riot-proxy', '.env'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfig],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => ({
        type: 'postgres',
        host: databaseConfig.HOST,
        username: databaseConfig.USERNAME,
        password: databaseConfig.PASSWORD,
        database: databaseConfig.DATABASE,
        ssl: true,
        autoLoadEntities: true,
        /**
         * @todo Replace with migrations once stabilized.
         */
        synchronize: true,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
