import {Tenant} from '../../domain/tenant/types';
import {config} from './config';
import {CsvRepository} from './csvRepository';

export class CsvTenantRepository extends CsvRepository<Tenant> {
  constructor(csvFilePath: string) {
    super(csvFilePath);
  }
  parseRow(row: Record<string, string>) {
    return {
      id: row['id'],
      propertyId: row['propertyId'],
      name: row['name'],
    };
  }
}

export const csvTenantRepository = new CsvTenantRepository(
  config.csvPaths.tenant
);
