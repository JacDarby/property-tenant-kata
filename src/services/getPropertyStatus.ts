import {Property, propertyStatus} from '../domain/property/types';
import {Repository} from '../repositories/repository/repository';
import {Tenant} from '../domain/tenant/types';
import {noPropertiesFoundError} from '../domain/property/errors';

export class GetPropertyStatusService {
  constructor(
    private propertyRepository: Repository<Property>,
    private tenantRepository: Repository<Tenant>
  ) {}
  public async getPropertyStatusById(
    propertyId: Property['id']
  ): Promise<propertyStatus> {
    const property = await this.propertyRepository.getById(propertyId);
    if (!property) {
      throw noPropertiesFoundError;
    }
    const tenantCount = (
      await this.tenantRepository.getAll({
        predicate: tenant => tenant.propertyId === propertyId,
      })
    ).length;
    const hasTenants = tenantCount > 0;
    const isMaxCapacity = this.isMaxCapacity(property, tenantCount);
    const exceedsTenancyDate = this.exceedsTenancyDate(property);

    switch (true) {
      case !hasTenants:
        return propertyStatus['PROPERTY_VACANT'];
      case !exceedsTenancyDate && isMaxCapacity:
        return propertyStatus['PROPERTY_ACTIVE'];
      case hasTenants && !isMaxCapacity && !exceedsTenancyDate:
        return propertyStatus['PARTIALLY_VACANT'];
      case hasTenants && exceedsTenancyDate:
        return propertyStatus['PROPERTY_OVERDUE'];
      default:
        throw new Error('Could not assign a property status');
    }
  }
  private isMaxCapacity(property: Property, tenantCount: number) {
    return property.capacity === tenantCount;
  }
  private exceedsTenancyDate(property: Property) {
    return new Date() > property.tenancyEndDate;
  }
}
