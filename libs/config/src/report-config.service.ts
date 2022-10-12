import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as assert from 'assert';

enum ConfigKeys {
  REPORT_BASE_PATH = 'REPORT_BASE_PATH',
}

@Injectable()
export class ReportConfigService {
  constructor(private configService: ConfigService) {
    const REPORT_BASE_PATH = this.configService.get<string>(
      ConfigKeys.REPORT_BASE_PATH,
    );
    assert.ok(typeof REPORT_BASE_PATH === 'string');
  }

  get REPORT_BASE_PATH(): string {
    return this.configService.get<string>(ConfigKeys.REPORT_BASE_PATH);
  }
}
