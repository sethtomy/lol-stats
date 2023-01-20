import { Injectable } from '@nestjs/common';
import * as assert from 'assert';

enum ConfigKeys {
  URL = 'URL',
}

@Injectable()
export class Config {
  private static _instance;

  public static get instance(): Config {
    if (!this._instance) {
      this._instance = new Config();
    }
    return this._instance;
  }

  private constructor() {
    const URL = this.URL;
    assert.ok(typeof URL === 'string');
  }

  get URL(): string {
    return process.env[ConfigKeys.URL];
  }
}
