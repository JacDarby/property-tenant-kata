import * as assert from 'assert/strict';
import {describe, test} from 'node:test';
import {csvTenantRepository} from './csvTenantRepository';

describe('csvTenantRepository', () => {
  test('getAll returns all tenants', async () => {
    const result = await csvTenantRepository.getAll();
    assert.strictEqual(result.length, 250);
  });
  test('getAll can filter by criteria', async () => {
    const result = await csvTenantRepository.getAll({
      predicate: tenant => tenant.name === 'Ethan Cook',
    });
    assert.strictEqual(result.length, 1);
  });
  test('getById returns a tenant', async () => {
    const result = await csvTenantRepository.getById('t_5268');
    assert.deepEqual(result, {
      id: 't_5268',
      propertyId: 'p_1101',
      name: 'Amelia Campbell',
    });
  });
  test('getById return undefined if no tenant is found', async () => {
    const result = await csvTenantRepository.getById('t_0000');
    assert.deepEqual(result, undefined);
  });
});
