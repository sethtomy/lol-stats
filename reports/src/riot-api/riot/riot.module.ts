import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import RiotClient from './RiotClient';

@Module({
  imports: [ConfigModule],
  providers: [RiotClient],
  exports: [RiotClient],
})
export class RiotModule {}
