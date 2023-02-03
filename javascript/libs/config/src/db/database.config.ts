import { IsString, IsUrl } from 'class-validator';

export class DatabaseConfig {
  @IsUrl()
  public readonly HOST!: string;

  @IsString()
  public readonly USERNAME!: string;

  @IsString()
  public readonly PASSWORD!: string;

  @IsString()
  public readonly DATABASE!: string;
}
