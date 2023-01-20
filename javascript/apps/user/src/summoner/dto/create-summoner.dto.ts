import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSummonerDto {
  @ApiProperty()
  @IsString()
  name: string;
}
