import * as assert from 'assert/strict';
import {describe, test} from 'node:test';
import {csvPropertyRepository} from './csvPropertyRepository';

describe('csvPropertyRepository', () => {
  test('getAll returns all properties', async () => {
    const result = await csvPropertyRepository.getAll();
    assert.strictEqual(result.length, 100);
  });
  test('getAll can filter by criteria', async () => {
    const result = await csvPropertyRepository.getAll({
      predicate: property => property.capacity === 4,
    });
    assert.strictEqual(result.length, 17);
  });
  test('getById returns a single property', async () => {
    const result = await csvPropertyRepository.getById('p_1002');
    assert.deepEqual(result, {
      id: 'p_1002',
      address: '11 Fielding Road',
      postcode: 'FK71 6GH',
      monthlyRentPence: 158800,
      region: 'N.IRELAND',
      capacity: 4,
      tenancyEndDate: new Date('2024-07-01T00:00:00.000Z'),
    });
  });
  test('getById return undefined if no property is found', async () => {
    const result = await csvPropertyRepository.getById('p_0000');
    assert.deepEqual(result, undefined);
  });
});
