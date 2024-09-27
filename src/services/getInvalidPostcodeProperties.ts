import {Property} from '../domain/property/types';
import {Repository} from '../repositories/repository/repository';
/**
 * The regex was taken from [stack overflow](https://stackoverflow.com/a/7259020)
 */
const isValidPostcode =
  /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

export class GetInvalidPostcodePropertiesService {
  constructor(private propertyRepository: Repository<Property>) {}
  public async getInvalidPostcodePropertyIds(): Promise<Property['id'][]> {
    const properties = await this.propertyRepository.getAll({
      predicate: property => !isValidPostcode.test(property.postcode),
    });
    return properties.map(({id}) => id);
  }
}
