import { Configuration, UserApi } from '@sethtomy/user-client';
import { Config } from '../config';
import { randomUUID } from 'crypto';
import {
  getCreateUserDto,
  getDiscordUserId,
  validateResponse,
} from '../data/user';

describe('User Integration Tests', () => {
  const config = Config.instance;
  const configuration = new Configuration();
  const userApi = new UserApi(configuration, config.URL);
  const DISCORD_USER_ID = getDiscordUserId();
  const createUserDto = getCreateUserDto(DISCORD_USER_ID);

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
