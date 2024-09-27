import {Property, region} from '../../domain/property/types';
import {config} from './config';
import {CsvRepository} from './csvRepository';

export class CsvPropertyRepository extends CsvRepository<Property> {
  constructor(csvFilePath: string) {
    super(csvFilePath);
  }
  parseRow(row: Record<string, string>) {
    return {
      id: row['id'],
      address: row['address'],
      postcode: row['postcode'],
      monthlyRentPence: parseInt(row['monthlyRentPence']),
      region: row['region'] as region,
      capacity: parseInt(row['capacity']),
      tenancyEndDate: new Date(row['tenancyEndDate']),
    };
  }
}

export const csvPropertyRepository = new CsvPropertyRepository(
  config.csvPaths.property
);
