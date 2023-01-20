import { CreateSummonerDto } from '@sethtomy/user-client';

export function getSummonerName() {
  return 'HeavensVanguard';
}

export function getCreateSummonerDto(name: string): CreateSummonerDto {
  return {
    name,
  };
}

export function validateSummonerResponse(
  createSummonerDto: CreateSummonerDto,
  res: CreateSummonerDto,
) {
  expect(res).toStrictEqual(createSummonerDto);
}
