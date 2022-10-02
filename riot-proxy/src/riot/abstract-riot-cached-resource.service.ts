export abstract class AbstractRiotCachedResourceService<T> {
  /**
   * @todo Replace the below with MongoDB.
   */
  private readonly resourceMap: Record<string, T>;

  protected constructor() {
    this.resourceMap = {};
  }

  private getFromCache(key: string) {
    const resource = this.resourceMap[key];
    return resource;
  }

  private setInCache(key: string, value: T) {
    this.resourceMap[key] = value;
  }

  protected async runAgainstCache<U extends any[]>(
    identifier: string,
    fn: (...params: U) => Promise<T>,
    ...params: U
  ): Promise<T> {
    let resource = this.getFromCache(identifier);
    if (!resource) {
      try {
        resource = await fn(...params);
      } catch (error) {
        console.error(error);
      }
      this.setInCache(identifier, resource);
    }
    return resource;
  }
}
