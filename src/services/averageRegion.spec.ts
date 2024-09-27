import * as assert from 'assert/strict';
import {describe, test, before} from 'node:test';
import {AverageRegionRentService} from './averageRegion';
import {Repository} from '../repositories/repository/repository';
import {Property} from '../domain/property/types';

/**
 * This is to prove the repositories can be stubbed out.
 */
class TestPropertyRepository implements Repository<Property> {
  async getAll(options?: {
    predicate?: ((value: Property) => boolean) | undefined;
  }) {
    const properties: Property[] = [
      {
        id: 'p_0001',
        address: 'fake street',
        postcode: 'tn34 3Dl',
        monthlyRentPence: 100,
        region: 'ENGLAND',
        capacity: 5,
        tenancyEndDate: new Date(),
      },
      {
        id: 'p_0002',
        address: 'bacon street',
        postcode: 'tn34 3Dl',
        monthlyRentPence: 200,
        region: 'WALES',
        capacity: 5,
        tenancyEndDate: new Date(),
      },
      {
        id: 'p_0003',
        address: 'wales street',
        postcode: 'tn34 3Dl',
        monthlyRentPence: 100,
        region: 'WALES',
        capacity: 5,
        tenancyEndDate: new Date(),
      },
    ];
    if (options?.predicate) {
      return properties.filter(options.predicate);
    }
    return properties;
  }
  async getById(id: string): Promise<Property | undefined> {
    const properties = await this.getAll();
    return properties.find(property => (property.id = id));
  }
}

describe('averageRegion', () => {
  let averageRentService: AverageRegionRentService;
  before(() => {
    averageRentService = new AverageRegionRentService(
      new TestPropertyRepository()
    );
  });
  test('gets averageRegion', async () => {
    const wales = await averageRentService.getAverageRentByRegion('WALES');
    const england = await averageRentService.getAverageRentByRegion('ENGLAND');
    assert.strictEqual(wales, 150);
    assert.strictEqual(england, 100);
  });
});
