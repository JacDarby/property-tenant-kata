import * as fs from 'fs';
import csvParser from 'csv-parser';
import {Repository} from '../repository/repository';

export abstract class CsvRepository<T extends {id: string}>
  implements Repository<T>
{
  constructor(protected csvFilePath: string) {}
  public async getAll(options?: {
    predicate?: (value: T) => boolean;
  }): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const collection: T[] = [];
      fs.createReadStream(this.csvFilePath)
        .pipe(csvParser())
        .on('data', (row: Record<string, string>) => {
          const item = this.parseRow(row);

          if (options?.predicate) {
            if (options.predicate(item)) {
              collection.push(item);
            }
            return;
          }
          collection.push(item);
        })
        .on('end', () => resolve(collection))
        .on('error', (err: Error) => reject(err));
    });
  }

  public async getById(id: T['id']): Promise<T | undefined> {
    const properties = await this.getAll();
    return properties.find(property => property.id === id);
  }

  abstract parseRow(row: Record<string, string>): T;
}
