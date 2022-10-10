import { Get, Injectable, NotFoundException } from '@nestjs/common';
import SummonerReportDto from './models/summoner-report.dto';
import { DateTimeUnit } from 'luxon';
import AbstractReportService from '../../domain/AbstractReportService';
import { ChampionReportService } from '../../domain/champion-report/champion-report.service';
import { SummonerReportService } from '../../domain/summoner-report/summoner-report.service';
import ChampionReportDto from '../../domain/champion-report/champion-report.dto';
import {
  Configuration,
  MatchApi,
  ParticipantDto,
  SummonerApi,
} from '@sethtomy/riot-proxy-client';
import { RiotProxyConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';

@Injectable()
export class SummonerReportInfraService extends AbstractReportService {
  private readonly summonerApi: SummonerApi;
  private readonly matchApi: MatchApi;

  constructor(
    private readonly championReportService: ChampionReportService,
    private readonly summonerReportService: SummonerReportService,
    private readonly riotProxyConfigService: RiotProxyConfigService,
    httpClientService: HttpClientService,
  ) {
    super();
    const config = new Configuration();
    this.summonerApi = new SummonerApi(
      config,
      riotProxyConfigService.RIOT_PROXY_BASE_PATH,
      httpClientService.axiosInstance,
    );
    this.matchApi = new MatchApi(
      config,
      riotProxyConfigService.RIOT_PROXY_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }

  public async getSummonerReportByPeriod(
    summonerName: string,
    timePeriod: DateTimeUnit,
  ): Promise<SummonerReportDto> {
    const summonerRes = await this.summonerApi.summonerControllerGetByName(
      summonerName,
    );
    const puuid = summonerRes.data.puuid;
    const matchRes = await this.matchApi.matchControllerGetByPuuid(
      puuid,
      timePeriod,
    );
    const participantDTOS = await this.getAllMatchesFilterParticipant(
      puuid,
      matchRes.data,
    );
    return this.summonerReportService.get(summonerName, participantDTOS);
  }

  @Get(':summonerName/champion/:championName/time-period/:timePeriod')
  public async getSummonerReportByPeriodAndChampion(
    summonerName: string,
    championName: string,
    timePeriod: DateTimeUnit,
  ): Promise<ChampionReportDto> {
    const summonerReportDto = await this.getSummonerReportByPeriod(
      summonerName,
      timePeriod,
    );
    // todo: some validation on champion name
    const championReport = summonerReportDto.championReports.find(
      (championReport) => {
        return championReport.championName === championName;
      },
    );
    if (!championReport) {
      throw new NotFoundException(
        `Report for ${summonerName} not found in last ${timePeriod}.`,
      );
    }
    return championReport;
  }

  private async getAllMatchesFilterParticipant(
    puuid: string,
    matchIds: string[],
  ): Promise<ParticipantDto[]> {
    const matches: ParticipantDto[] = [];
    for (const matchId of matchIds) {
      const matchRes = await this.matchApi.matchControllerGetById(matchId);
      const filtered = matchRes.data.info.participants.find(
        (participant) => participant.puuid === puuid,
      );
      matches.push(filtered);
    }
    return matches;
  }
}
