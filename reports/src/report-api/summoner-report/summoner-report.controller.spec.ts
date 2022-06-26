import { Test, TestingModule } from '@nestjs/testing';
import { SummonerReportController } from './summoner-report.controller';
import { SummonerReportService } from './summoner-report.service';

describe('SummonerReportController', () => {
  let controller: SummonerReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonerReportController],
      providers: [SummonerReportService],
    }).compile();

    controller = module.get<SummonerReportController>(SummonerReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
