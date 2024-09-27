import * as assert from 'assert/strict';
import {before, describe, test} from 'node:test';
import {csvPropertyRepository} from '../repositories/csvRepositories/csvPropertyRepository';
import {
  GetPropertyStatusService,
} from '../services/getPropertyStatus';
import { propertyStatus } from '../domain/property/types';
import {csvTenantRepository} from '../repositories/csvRepositories/csvTenantRepository';
const now = 1727369357000;
describe('Task 4: getPropertyStatus', () => {
  let getPropertyStatusService: GetPropertyStatusService;
  before(() => {
    getPropertyStatusService = new GetPropertyStatusService(
      csvPropertyRepository,
      csvTenantRepository
    );
  });
  test('If a property has no tenants, it returns PROPERTY_VACANT', async context => {
    context.mock.timers.enable({apis: ['Date'], now});
    const result =
      await getPropertyStatusService.getPropertyStatusById('p_1040');
    assert.strictEqual(result, propertyStatus['PROPERTY_VACANT']);
  });
  test('If a property has at least one tenant but fewer tenants than the capacity and the current date is not past the tenancy end date, return "PARTIALLY_VACANT"', async context => {
    context.mock.timers.enable({apis: ['Date'], now});
    const result =
      await getPropertyStatusService.getPropertyStatusById('p_1019');
    assert.strictEqual(result, propertyStatus['PARTIALLY_VACANT']);
  });
  test('If a property has tenants and no capacity, and the current date is not past the tenancy end date, return "PROPERTY_ACTIVE"', async context => {
    context.mock.timers.enable({apis: ['Date'], now});
    const result =
      await getPropertyStatusService.getPropertyStatusById('p_1020');
    assert.strictEqual(result, propertyStatus['PROPERTY_ACTIVE']);
  });
  test('If a property has at least one tenant but the current date is past the tenancy end date, return "PROPERTY_OVERDUE".', async context => {
    context.mock.timers.enable({apis: ['Date'], now});
    const result =
      await getPropertyStatusService.getPropertyStatusById('p_1002');
    assert.strictEqual(result, propertyStatus['PROPERTY_OVERDUE']);
  });
});
