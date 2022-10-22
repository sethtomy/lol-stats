import {
  CreateUserDto,
  UserApi,
  Configuration,
  User,
} from '../../../libs/user-client/src';
import { Config } from './config';
import { randomUUID } from 'crypto';

function getDiscordUserId(): string {
  return 'int-test-' + randomUUID(); // no validation
}

function getCreateUserDto(discordUserId: string): CreateUserDto {
  return {
    discordUserId,
    summonerNames: ['HeavensVanguard'],
  };
}

function validateResponse(createUserDto: CreateUserDto, user: User) {
  expect(user).toStrictEqual(createUserDto);
}

describe('User Integration Tests', () => {
  const config = Config.instance;
  const configuration = new Configuration();
  const userApi = new UserApi(configuration, config.URL);
  const DISCORD_USER_ID = getDiscordUserId();
  const createUserDto = getCreateUserDto(DISCORD_USER_ID);
  let EXISTING_USER_COUNT: number;

  beforeAll(async () => {
    const res = await userApi.userControllerFindAll();
    EXISTING_USER_COUNT = res.data.length;
  });

  afterEach(async () => {
    await userApi.userControllerRemove(DISCORD_USER_ID, {
      validateStatus: (status) => status === 204 || status === 404,
    });
  });

  describe('Create User', () => {
    test('201 - Happy Path', async () => {
      const res = await userApi.userControllerCreate(createUserDto);
      expect(res.status).toBe(201);
      validateResponse(createUserDto, res.data);
    });

    test('409 - User Conflict', async () => {
      await userApi.userControllerCreate(createUserDto);
      await userApi.userControllerCreate(createUserDto, {
        validateStatus: (status) => status === 409,
      });
    });
  });

  describe('Get User', () => {
    test('200 - Happy Path', async () => {
      await userApi.userControllerCreate(createUserDto);
      const res = await userApi.userControllerFindOne(DISCORD_USER_ID);
      expect(res.status).toBe(200);
    });

    test('404 - User DNE', async () => {
      await userApi.userControllerFindOne(randomUUID(), {
        validateStatus: (status) => status === 404,
      });
    });
  });

  describe('Get All Users', () => {
    test('200 - Happy Path', async () => {
      await userApi.userControllerCreate(createUserDto);
      const res = await userApi.userControllerFindAll();
      expect(res.status).toBe(200);
      expect(res.data.length).toBe(1 + EXISTING_USER_COUNT);
      const user = res.data.find(
        (user) => user.discordUserId === DISCORD_USER_ID,
      );
      validateResponse(createUserDto, user);
    });
  });

  describe('Delete User', () => {
    test('204 - Happy Path', async () => {
      await userApi.userControllerCreate(createUserDto);
      const res = await userApi.userControllerRemove(
        createUserDto.discordUserId,
      );
      expect(res.status).toBe(204);
    });

    test('404 - User DNE', async () => {
      await userApi.userControllerRemove(randomUUID(), {
        validateStatus: (status) => status === 404,
      });
    });
  });
});
