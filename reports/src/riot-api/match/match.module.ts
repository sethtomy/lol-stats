import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { RiotModule } from '../riot/riot.module';

@Module({
  imports: [RiotModule],
  exports: [MatchService],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
