import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  discordUserId: string;

  @ApiProperty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  summonerNames: string[];
}
