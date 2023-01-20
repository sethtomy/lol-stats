import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getByDiscordUserId(discordUserId: string): Promise<User> {
    return this.userRepository.findOneBy({
      discordUserId,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.discordUserId = createUserDto.discordUserId;
    const existingUser = await this.getByDiscordUserId(user.discordUserId);
    if (existingUser) {
      throw new ConflictException(
        `User with Discord User ID ${createUserDto.discordUserId} already exists.`,
      );
    }
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(discordUserId: string): Promise<User> {
    const user = await this.getByDiscordUserId(discordUserId);
    if (!user) {
      throw new NotFoundException(
        `User with Discord User ID ${discordUserId} not found.`,
      );
    }
    return user;
  }

  async remove(discordUserId: string): Promise<void> {
    await this.findOne(discordUserId);
    await this.userRepository.delete({ discordUserId });
  }
}
