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

export type Warehouse = {
  __typename?: 'Warehouse';
  id: Scalars['ID'];
  name: Scalars['String'];
  cars: Cars;
};

export type Cars = {
  __typename?: 'Cars';
  location?: Maybe<Scalars['String']>;
  vehicles: Array<Maybe<Vehicle>>;
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
};

