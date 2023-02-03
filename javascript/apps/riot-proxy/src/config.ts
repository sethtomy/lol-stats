import { DatabaseConfig } from '@sethtomy/config';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

export class RootConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsObject()
  public readonly DATABASE!: DatabaseConfig;
}
