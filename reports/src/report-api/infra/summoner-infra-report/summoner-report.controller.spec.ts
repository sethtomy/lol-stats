import { Test, TestingModule } from '@nestjs/testing';
import { SummonerReportController } from './summoner-report.controller';
import { SummonerReportInfraService } from './summoner-report-infra.service';

describe('SummonerReportController', () => {
  let controller: SummonerReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonerReportController],
      providers: [SummonerReportInfraService],
    }).compile();

    controller = module.get<SummonerReportController>(SummonerReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
