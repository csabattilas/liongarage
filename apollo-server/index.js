const {ApolloServer} = require('apollo-server');
const express = require('express');
const path = require('path');
const CarsApi = require('./datasources/cars-api')
const resolvers = require('./resolvers/resolvers');
const typeDefs = require('./types/types');

const apolloServer = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    dataSources: () => ({
        carsApi: new CarsApi()
    }),
});

const staticServer = express();

staticServer.use('/warehouses', express.static(path.join(__dirname, 'static', 'warehouses.json')));

staticServer.listen(3001, () => {
  console.log(`🚀  Static Server ready`);
});

apolloServer.listen().then(({url}) => {
    console.log(`🚀  Apollo Server ready at ${url}`);
});
