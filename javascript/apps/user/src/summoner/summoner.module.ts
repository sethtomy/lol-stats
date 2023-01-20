import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { HttpClientModule } from '@sethtomy/http-client';
import { RiotConfigModule } from '@sethtomy/config';

@Module({
  imports: [
    HttpClientModule,
    RiotConfigModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SummonerController],
  providers: [SummonerService],
})
export class SummonerModule {}
