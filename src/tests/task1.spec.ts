import * as assert from 'assert/strict';
import {describe, test, before} from 'node:test';
import {AverageRegionRentService} from '../services/averageRegion';
import {region} from '../domain/property/types';
import {csvPropertyRepository} from '../repositories/csvRepositories/csvPropertyRepository';

describe('Task 1: averageRegion', () => {
  let averageRentService: AverageRegionRentService;
  before(() => {
    averageRentService = new AverageRegionRentService(csvPropertyRepository);
  });
  test('Will return the average rent for a region', async () => {
    const wales = await averageRentService.getAverageRentByRegion('WALES');
    const england = await averageRentService.getAverageRentByRegion('ENGLAND');
    assert.strictEqual(wales, 152955.55555555556);
    assert.strictEqual(england, 166928.57142857142);
  });
  test('Will throw an error if an invalid region is given, or no properties belong to the region', async () => {
    assert.rejects(
      averageRentService.getAverageRentByRegion('FRANCE' as region)
    );
  });
});
