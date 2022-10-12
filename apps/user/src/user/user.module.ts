import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RiotConfigModule } from '@sethtomy/config';
import { HttpClientModule } from '@sethtomy/http-client';

@Module({
  imports: [
    HttpClientModule,
    RiotConfigModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
