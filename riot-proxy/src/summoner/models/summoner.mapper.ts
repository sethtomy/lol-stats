import RiotSummonerDto from './riot-summoner.dto';
import SummonerDto from './summoner.dto';

export default class SummonerMapper {
  public static riotToResponse(riotSummonerDto: RiotSummonerDto): SummonerDto {
    return new SummonerDto(riotSummonerDto);
  }
}
