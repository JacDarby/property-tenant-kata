import * as assert from 'assert/strict';
import {describe, test, before} from 'node:test';
import {AverageTenantRentService} from '../services/averageTenantRent';
import {csvTenantRepository} from '../repositories/csvRepositories/csvTenantRepository';
import {csvPropertyRepository} from '../repositories/csvRepositories/csvPropertyRepository';

describe('Task 2: averageTenantRent', () => {
  let averageTenantRentService: AverageTenantRentService;
  before(() => {
    averageTenantRentService = new AverageTenantRentService(
      csvPropertyRepository,
      csvTenantRepository
    );
  });
  test('Will return the average rent per tenant for a property in pounds', async () => {
    const result = await averageTenantRentService.getAverageRentByRegion(
      'p_1021',
      {denomination: '£'}
    );
    assert.strictEqual(result, 1008);
  });
  test('Will return the average rent per tenant for a property in pence', async () => {
    const result = await averageTenantRentService.getAverageRentByRegion(
      'p_1021',
      {denomination: 'p'}
    );
    assert.strictEqual(result, 100800);
  });
  test('Will return the average rent per tenant for a property in pounds if no options given', async () => {
    const result =
      await averageTenantRentService.getAverageRentByRegion('p_1021');
    assert.strictEqual(result, 1008);
  });
  test('Will throw an error if the property has no tenants', async () => {
    assert.rejects(averageTenantRentService.getAverageRentByRegion('p_1040'));
  });
  test('Will throw an error if the property does not exist', async () => {
    assert.rejects(averageTenantRentService.getAverageRentByRegion('p_0000'));
  });
});
