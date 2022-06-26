import { Controller, Get, Param } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { RiotAPITypes } from '@fightmegg/riot-api';
import SummonerDTO = RiotAPITypes.Summoner.SummonerDTO;

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get(':name')
  public getByName(@Param('name') name: string): Promise<SummonerDTO> {
    return this.summonerService.getByName(name);
  }
}
