import { Config } from '../config';
import {
  Configuration,
  SummonerApi,
  UserApi,
} from '@sethtomy/user-client';
import {
  getCreateUserDto,
  getDiscordUserId,
  validateResponse as validateUserResponse,
} from '../data/user';

describe('Full Flow Integration Tests', () => {
  const config = Config.instance;
  const configuration = new Configuration();
  const userApi = new UserApi(configuration, config.URL);
  const summonerApi = new SummonerApi(configuration, config.URL);
  const DISCORD_USER_ID = getDiscordUserId();
  const createUserDto = getCreateUserDto(DISCORD_USER_ID);

  test('Full Flow', async () => {
    await userApi.userControllerCreate(createUserDto);
    await summonerApi.summonerControllerCreate(DISCORD_USER_ID, {
      name: 'HeavensVanguard',
    });
    await summonerApi.summonerControllerCreate(DISCORD_USER_ID, {
      name: 'BDGxHvnsVngrd',
    });
    const user = await userApi.userControllerFindOne(DISCORD_USER_ID);
    validateUserResponse(createUserDto, user.data);
    expect(user.data.summonerNames).toStrictEqual([
      'HeavensVanguard',
      'BDGxHvnsVngrd',
    ]);
    await userApi.userControllerRemove(DISCORD_USER_ID);
  });
});
