export interface Repository<T extends {id: string}> {
  getAll(options?: {predicate?: (value: T) => boolean}): Promise<T[]>;
  getById(id: T['id']): Promise<T | undefined>;
}
