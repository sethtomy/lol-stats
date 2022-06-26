import { Test, TestingModule } from '@nestjs/testing';
import { SummonerReportService } from './summoner-report.service';

describe('SummonerReportService', () => {
  let service: SummonerReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummonerReportService],
    }).compile();

    service = module.get<SummonerReportService>(SummonerReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
