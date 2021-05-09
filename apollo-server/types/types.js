const {gql} = require('apollo-server');

module.exports = gql`
    type Warehouse {
      id: ID!,
      name: String!,
      cars: Cars!
    }

    type Cars {
      location: String,
      vehicles: [Vehicle]!
    }

    type Vehicle {
      id:ID!,
      make: String!,
      model: String!,
      year_model: Int!,
      price: Float!,
      licensed: Boolean!,
      date_added: String!
    }

    type Query {
        allCars: [Vehicle!]!,
        vehicle(id: ID!): Vehicle!
    }
`;
