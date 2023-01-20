import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { RiotModule } from '../riot/riot.module';

@Module({
  imports: [RiotModule],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
