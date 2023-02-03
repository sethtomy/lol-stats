import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AbstractKeyValueEntity } from '../db/kev-value.entity';
import * as QuickLRU from 'quick-lru';

export abstract class AbstractRiotCachedResourceService<T> {
  lru: QuickLRU<string, T>;

  protected constructor(
    private readonly repository: Repository<AbstractKeyValueEntity<T>>,
  ) {
    this.lru = new QuickLRU({ maxSize: 1000 });
  }

  private async getFromCache(id: string): Promise<T | undefined> {
    if (this.lru.has(id)) {
      return this.lru.get(id);
    }
    const resource = await this.repository.findOneBy({ id });
    if (resource) {
      this.lru.set(id, resource.data);
    }
    return resource?.data;
  }

  private async setInCache(id: string, data: T) {
    this.lru.set(id, data);
    await this.repository.save({ id, data });
  }

  protected async runAgainstCache<U extends any[]>(
    identifier: string,
    fn: (...params: U) => Promise<T>,
    ...params: U
  ): Promise<T> {
    let resource = await this.getFromCache(identifier);
    if (!resource) {
      try {
        resource = await fn(...params);
      } catch (error) {
        /**
         * @todo Replace this.
         */
        const httpError = error[Object.getOwnPropertySymbols(error)[1]];
        throw new HttpException(httpError, httpError.status);
      }
      await this.setInCache(identifier, resource);
    }
    return resource;
  }
}
