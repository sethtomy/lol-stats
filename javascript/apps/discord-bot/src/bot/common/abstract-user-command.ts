import { UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { Configuration } from '@sethtomy/report-client';
import {
  CreateUserDto,
  SummonerApi,
  User,
  UserApi,
} from '@sethtomy/user-client';

export abstract class AbstractUserCommand {
  protected readonly userApi: UserApi;
  protected readonly summonerApi: SummonerApi;

  protected constructor(
    userConfigService: UserConfigService,
    httpClientService: HttpClientService,
  ) {
    const config = new Configuration();
    this.userApi = new UserApi(
      config,
      userConfigService.USER_BASE_PATH,
      httpClientService.axiosInstance,
    );
    this.summonerApi = new SummonerApi(
      config,
      userConfigService.USER_BASE_PATH,
      httpClientService.axiosInstance,
    );
  }

  protected async createUserIfDoesNotExist(
    discordUserId: string,
  ): Promise<User> {
    let res = await this.userApi.userControllerFindOne(discordUserId, {
      validateStatus: (status) => status === 200 || status === 404,
    });
    if (res.status === 404) {
      const createUserDto: CreateUserDto = {
        discordUserId,
      };
      res = await this.userApi.userControllerCreate(createUserDto);
    }
    return res.data;
  }
}
