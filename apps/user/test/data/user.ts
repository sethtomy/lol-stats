import { randomUUID } from 'crypto';
import { CreateUserDto, User } from '@sethtomy/user-client';

export function getDiscordUserId(): string {
  return 'int-test-' + randomUUID(); // no validation
}

export function getCreateUserDto(discordUserId: string): CreateUserDto {
  return {
    discordUserId,
  };
}

export function validateResponse(createUserDto: CreateUserDto, user: User) {
  expect(user).toStrictEqual({
    ...createUserDto,
    summonerNames: expect.any(Array),
  });
}
