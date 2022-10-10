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

@Injectable()
export class UserService {
  private readonly summonerApi: SummonerApi;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    riotProxyConfigService: RiotProxyConfigService,
  ) {
    const config = new Configuration();
    this.summonerApi = new SummonerApi(
      config,
      riotProxyConfigService.RIOT_PROXY_BASE_PATH,
    );
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.discordUserId = createUserDto.discordUserId;
    user.summonerNames = createUserDto.summonerNames;
    await this.validateSummoners(user.summonerNames);
    const existingUser = await this.userRepository.findOneBy({
      discordUserId: user.discordUserId,
    });
    if (existingUser) {
      throw new ConflictException();
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

  async findOne(id: number): Promise<User> {
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
