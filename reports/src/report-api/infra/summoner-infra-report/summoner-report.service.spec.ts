import { Test, TestingModule } from '@nestjs/testing';
import { SummonerReportInfraService } from './summoner-report-infra.service';

describe('SummonerReportService', () => {
  let service: SummonerReportInfraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummonerReportInfraService],
    }).compile();

    service = module.get<SummonerReportInfraService>(
      SummonerReportInfraService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
