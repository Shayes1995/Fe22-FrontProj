export interface Apartement {
  _id: string;
  title: string;
  available: string;
  description: string;
  imgURL: {
    name: string;
    url: string;
  }[];
  period: string;
  unitType: string;
  area: string;
  floor: string;
  rent: string;
  rooms: string;
  size: string;
  city: string;
  street: string;
  zipcode: string;
  apply: string;
  includes: {
    name: string;
  }[];
  status: boolean;
}

export interface DetailshouseProps {
  apartement: Apartement | null;
}

export enum BuildingType {
  APARTMENT = 'unitApartement',
  HOUSE = 'unitHouse',
  ROOM = 'unitRoom',
  COLLECTIVE = 'unitCollective',
}

export type QuickFilterType = BuildingType | null;
