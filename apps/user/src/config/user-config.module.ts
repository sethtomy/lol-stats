import { Module } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [UserConfigService],
  providers: [UserConfigService],
})
export class UserConfigModule {}
