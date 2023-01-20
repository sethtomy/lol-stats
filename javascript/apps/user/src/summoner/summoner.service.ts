import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSummonerDto } from './dto/create-summoner.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Configuration, SummonerApi } from '@sethtomy/riot-proxy-client';
import { HttpClientService } from '@sethtomy/http-client';
import { RiotProxyConfigService } from '@sethtomy/config';

@Injectable()
export class SummonerService {
  private readonly summonerApi: SummonerApi;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    httpClientService: HttpClientService,
    riotProxyConfigService: RiotProxyConfigService,
  ) {
    const config = new Configuration();
    this.summonerApi = new SummonerApi(
      config,
      riotProxyConfigService.RIOT_PROXY_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }

  async create(
    discordUserId: string,
    createSummonerDto: CreateSummonerDto,
  ): Promise<CreateSummonerDto> {
    const user = await this.userService.findOne(discordUserId);
    const alreadyExists = user.summonerNames.find(
      (summonerName) => summonerName === createSummonerDto.name,
    );
    if (alreadyExists) {
      throw new ConflictException(
        `Summoner ${createSummonerDto.name} already exists.`,
      );
    }
    await this.validateSummoner(createSummonerDto.name);
    user.summonerNames.push(createSummonerDto.name);
    await this.userRepository.save(user);
    return createSummonerDto;
  }

  private async validateSummoner(name: string) {
    try {
      return await this.summonerApi.summonerControllerGetByName(name);
    } catch (error) {
      console.log(error.response);
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(`Summoner '${name}' not found.`);
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(discordUserId: string, name: string): Promise<void> {
    const user = await this.userService.findOne(discordUserId);
    const alreadyExists = user.summonerNames.find(
      (summonerName) => summonerName === name,
    );
    if (!alreadyExists) {
      throw new NotFoundException(`Summoner ${name} does not exist.`);
    }
    user.summonerNames = user.summonerNames.filter(
      (summonerName) => summonerName !== name,
    );
    await this.userRepository.save(user);
  }
}
