module.exports = {
    Query: {
        allCars: (_, __, {dataSources}) =>
            dataSources.carsApi.getAllCars(),
        warehouses: (_, __, {dataSources}) =>
            dataSources.carsApi.getAllCars(),
    }
};
