import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database-config.service';
import { DatabaseConfigModule } from './config/database-config.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
