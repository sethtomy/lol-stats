import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserConfigService } from '@sethtomy/config/user-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [UserConfigService],
  exports: [UserConfigService],
})
export class UserConfigModule {}
