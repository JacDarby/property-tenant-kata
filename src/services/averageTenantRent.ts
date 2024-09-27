import {Property} from '../domain/property/types';
import {Repository} from '../repositories/repository/repository';
import {Tenant} from '../domain/tenant/types';
import {noPropertiesFoundError} from '../domain/property/errors';
import {noTenantsFoundError} from '../domain/tenant/errors';
interface options {
  denomination: '£' | 'p';
}
export class AverageTenantRentService {
  constructor(
    private propertyRepository: Repository<Property>,
    private tenantRepository: Repository<Tenant>
  ) {}
  public async getAverageRentByRegion(
    propertyId: Property['id'],
    options: options = {denomination: '£'}
  ): Promise<number> {
    const property = await this.propertyRepository.getById(propertyId);
    if (!property) {
      throw noPropertiesFoundError;
    }
    const tenantsInPropertyCount = (
      await this.tenantRepository.getAll({
        predicate: tenant => tenant.propertyId === propertyId,
      })
    ).length;

    if (tenantsInPropertyCount === 0) {
      throw noTenantsFoundError;
    }

    const averageRent = property.monthlyRentPence / tenantsInPropertyCount;
    switch (options.denomination) {
      case 'p':
        return averageRent;
      case '£':
        return this.convertPenniesToPounds(averageRent);
    }
  }
  /**
   * Converts pennies to pounds and rounds to 2 decimal places.
   *
   * @param pennies - The amount in pennies
   * @returns The equivalent amount in pounds
   */
  private convertPenniesToPounds(pennies: number) {
    return pennies / 100;
  }
}
