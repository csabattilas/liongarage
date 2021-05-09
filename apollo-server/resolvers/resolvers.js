module.exports = {
    Query: {
        allVehicles: (_, __, {dataSources}) =>
            dataSources.carsApi.getAllCars(),
        vehicle: (_, {id}, {dataSources}) =>
          dataSources.carsApi.getVehicleById(id)
    }
};
