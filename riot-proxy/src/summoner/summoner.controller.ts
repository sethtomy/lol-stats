import { Controller, Get, Param } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import SummonerDto from './models/summoner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Summoner')
@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get(':name')
  public getByName(@Param('name') name: string): Promise<SummonerDto> {
    return this.summonerService.getByName(name);
  }
}
