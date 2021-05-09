const {gql} = require('apollo-server');

module.exports = gql`
    type Vehicle {
      id:ID!,
      make: String!,
      model: String!,
      year_model: Int!,
      price: Float!,
      licensed: Boolean!,
      date_added: String!
      location: Location!
    }

    type VehicleSummary {
      id:ID!,
      make: String!,
      model: String!,
      licensed: Boolean!,
      date_added: String!
      price: Float!
    }

    type MapLocation {
      long: Float!
      lat: Float!
    }

    type Location {
      warehouse: MapLocation!
      location: String!
    }

    type Query {
        allVehicles: [VehicleSummary!]!,
        vehicle(id: ID!): Vehicle!
    }
`;
