import {Property, region} from '../domain/property/types';
import {Repository} from '../repositories/repository/repository';
import {noPropertiesFoundError} from '../domain/property/errors';

export class AverageRegionRentService {
  constructor(private propertyRepository: Repository<Property>) {}
  public async getAverageRentByRegion(region: region): Promise<number> {
    const properties = await this.propertyRepository.getAll({
      predicate: property => property.region === region,
    });
    if (properties.length === 0) {
      throw noPropertiesFoundError;
    }
    const totalRent = this.getAllPropertyRentTotal(properties);
    const averageRent = totalRent / properties.length;
    return averageRent;
  }

  getAllPropertyRentTotal(properties: Property[]) {
    return properties.reduce((total, property) => {
      total += property.monthlyRentPence;
      return total;
    }, 0);
  }
}
