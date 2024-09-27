import {Property} from '../property/types';

export interface Tenant {
  id: string;
  propertyId: Property['id'];
  name: string;
}
