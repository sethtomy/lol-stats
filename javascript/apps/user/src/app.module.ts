import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database-config.service';
import { DatabaseConfigModule } from './config/database-config.module';
import { SummonerModule } from './summoner/summoner.module';

@Module({
  imports: [
    DatabaseConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        type: 'postgres',
        host: databaseConfigService.DATABASE_HOST,
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [DatabaseConfigService],
    }),
    SummonerModule,
  ],
})
export class AppModule {}
