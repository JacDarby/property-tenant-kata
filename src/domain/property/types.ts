export type region = 'ENGLAND' | 'WALES' | 'SCOTLAND' | 'N.IRELAND';

export interface Property {
  id: string;
  address: string;
  postcode: string;
  monthlyRentPence: number;
  region: region;
  capacity: number;
  tenancyEndDate: Date;
}
export enum propertyStatus {
  PROPERTY_VACANT = 'PROPERTY_VACANT',
  PARTIALLY_VACANT = 'PARTIALLY_VACANT',
  PROPERTY_ACTIVE = 'PROPERTY_ACTIVE',
  PROPERTY_OVERDUE = 'PROPERTY_OVERDUE',
}
