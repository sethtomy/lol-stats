import { Config } from '../config';
import {
  Configuration,
  SummonerApi,
  UserApi,
} from '../../../../libs/user-client/src';
import { randomUUID } from 'crypto';
import {
  getCreateSummonerDto,
  getSummonerName,
  validateSummonerResponse,
} from '../data/summoner';
import { getCreateUserDto, getDiscordUserId } from '../data/user';

describe('Summoner Integration Tests', () => {
  const config = Config.instance;
  const configuration = new Configuration();
  const userApi = new UserApi(configuration, config.URL);
  const summonerApi = new SummonerApi(configuration, config.URL);
  const DISCORD_USER_ID = getDiscordUserId();
  const createUserDto = getCreateUserDto(DISCORD_USER_ID);
  const SUMMONER_NAME = getSummonerName();
  const createSummonerDto = getCreateSummonerDto(SUMMONER_NAME);

  beforeAll(async () => {
    await userApi.userControllerCreate(createUserDto);
  });

  afterAll(async () => {
    await userApi.userControllerRemove(DISCORD_USER_ID);
  });

  afterEach(async () => {
    await summonerApi.summonerControllerRemove(DISCORD_USER_ID, SUMMONER_NAME, {
      validateStatus: (status) => status === 204 || status === 404,
    });
  });

  describe('Create Summoner', () => {
    test('201 - Happy Path', async () => {
      const res = await summonerApi.summonerControllerCreate(
        DISCORD_USER_ID,
        createSummonerDto,
      );
      expect(res.status).toBe(201);
      validateSummonerResponse(createSummonerDto, res.data);
    });

    test('404 - User DNE', async () => {
      await summonerApi.summonerControllerCreate(
        randomUUID(),
        createSummonerDto,
        {
          validateStatus: (status) => status === 404,
        },
      );
    });

    test('404 - Summoner DNE (Riot)', async () => {
      await summonerApi.summonerControllerCreate(
        DISCORD_USER_ID,
        {
          name: randomUUID(),
        },
        {
          validateStatus: (status) => status === 404,
        },
      );
    });

    test('409 - Conflict', async () => {
      await summonerApi.summonerControllerCreate(
        DISCORD_USER_ID,
        createSummonerDto,
      );
      await summonerApi.summonerControllerCreate(
        DISCORD_USER_ID,
        createSummonerDto,
        {
          validateStatus: (status) => status === 409,
        },
      );
    });
  });

  describe('Delete Summoner', () => {
    test('204 - Happy Path', async () => {
      await summonerApi.summonerControllerCreate(
        DISCORD_USER_ID,
        createSummonerDto,
      );
      const res = await summonerApi.summonerControllerRemove(
        DISCORD_USER_ID,
        SUMMONER_NAME,
      );
      expect(res.status).toBe(204);
    });

    test('404 - User DNE', async () => {
      await summonerApi.summonerControllerRemove(randomUUID(), SUMMONER_NAME, {
        validateStatus: (status) => status === 404,
      });
    });

    test('404 - Summoner DNE', async () => {
      await summonerApi.summonerControllerRemove(
        DISCORD_USER_ID,
        randomUUID(),
        {
          validateStatus: (status) => status === 404,
        },
      );
    });
  });
});
