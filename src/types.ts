export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  id: Scalars['ID'];
  make: Scalars['String'];
  model: Scalars['String'];
  year_model: Scalars['Int'];
  price: Scalars['Float'];
  licensed: Scalars['Boolean'];
  date_added: Scalars['String'];
  location: Location;
};

export type VehicleSummary = {
  __typename?: 'VehicleSummary';
  id: Scalars['ID'];
  make: Scalars['String'];
  model: Scalars['String'];
  licensed: Scalars['Boolean'];
  date_added: Scalars['String'];
  price: Scalars['Float'];
};

export type MapLocation = {
  __typename?: 'MapLocation';
  long: Scalars['Float'];
  lat: Scalars['Float'];
};

export type Location = {
  __typename?: 'Location';
  warehouse: MapLocation;
  location: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allVehicles: Array<VehicleSummary>;
  vehicle: Vehicle;
};


export type QueryVehicleArgs = {
  id: Scalars['ID'];
};
