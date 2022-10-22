import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Configuration, SummonerApi } from '@sethtomy/riot-proxy-client';
import { RiotProxyConfigService } from '@sethtomy/config/riot-proxy-config.service';
import { HttpClientService } from '@sethtomy/http-client';

@Injectable()
export class UserService {
  private readonly summonerApi: SummonerApi;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  private async getByDiscordUserId(discordUserId: string): Promise<User> {
    return this.userRepository.findOneBy({
      discordUserId,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.discordUserId = createUserDto.discordUserId;
    user.summonerNames = createUserDto.summonerNames;
    await this.validateSummoners(user.summonerNames);
    const existingUser = await this.getByDiscordUserId(user.discordUserId);
    if (existingUser) {
      throw new ConflictException(
        `User with Discord User ID ${createUserDto.discordUserId} already exists.`,
      );
    }
    return this.userRepository.save(user);
  }

  private async validateSummoners(summonerNames: string[]) {
    await Promise.all(
      summonerNames.map(async (summonerName) => {
        try {
          return await this.summonerApi.summonerControllerGetByName(
            summonerName,
          );
        } catch (error) {
          if (error.response.status === HttpStatus.NOT_FOUND) {
            throw new BadRequestException(
              `Summoner '${summonerName}' not found.`,
            );
          }
          throw new HttpException(error.message, error.response.status);
        }
      }),
    );
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  private async getByDiscordUserIdOrThrow(
    discordUserId: string,
  ): Promise<User> {
    const user = await this.getByDiscordUserId(discordUserId);
    if (!user) {
      throw new NotFoundException(
        `User with Discord User ID ${discordUserId} not found.`,
      );
    }
    return user;
  }

  async findOne(discordUserId: string): Promise<User> {
    return this.getByDiscordUserIdOrThrow(discordUserId);
  }

  async update(
    discordUserId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.getByDiscordUserIdOrThrow(discordUserId);
    await this.validateSummoners(updateUserDto.summonerNames);
    user.summonerNames = updateUserDto.summonerNames;
    await this.userRepository.save(user);
    return user;
  }

  async remove(discordUserId: string): Promise<void> {
    await this.getByDiscordUserIdOrThrow(discordUserId);
    await this.userRepository.delete({ discordUserId });
  }
}
