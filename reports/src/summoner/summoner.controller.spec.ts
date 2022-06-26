import { Test, TestingModule } from '@nestjs/testing';
import { SummonerController } from './summoner.controller';
import { SummonerService } from './summoner.service';

describe('SummonerController', () => {
  let controller: SummonerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonerController],
      providers: [SummonerService],
    }).compile();

    controller = module.get<SummonerController>(SummonerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
