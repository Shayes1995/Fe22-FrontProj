import { Users } from "./users";

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
  rent: number;
  rooms: string;
  size: string;
  city: string;
  street: string;
  zipcode: string;
  landLord: string;
  content: string;
  grades: string;
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

export interface Application {
  _id: string;
  apartement: Apartement;
  user: Users;
  status: string;
  __v: number;
}


export interface Payment {
  _id: string;
  user: Users;
  application: Application;
  amount: number;
  createdDate: number;
}

export interface Residents {
  _id: string;
  user: Users;
  application: Application;
  apartement: Apartement;
  payment: Payment;
  createdDate: number;

}