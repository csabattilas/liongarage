module.exports = {
    Query: {
        allCars: (_, __, {dataSources}) =>
            dataSources.carsApi.getAllCars(),
        vehicle: (_, {id}, {dataSources}) =>
          dataSources.carsApi.getVehicleById(id)
    }
};
