import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { CreateSummonerDto } from './dto/create-summoner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Summoner')
@Controller('user/:discordUserId/summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Post()
  create(
    @Param('discordUserId') discordUserId: string,
    @Body() createSummonerDto: CreateSummonerDto,
  ) {
    return this.summonerService.create(discordUserId, createSummonerDto);
  }

  @Delete(':name')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('discordUserId') discordUserId: string,
    @Param('name') name: string,
  ) {
    return this.summonerService.remove(discordUserId, name);
  }
}
