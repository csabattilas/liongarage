const {RESTDataSource} = require('apollo-datasource-rest');

class CarsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001';
  }

  /**
   *
   * @returns {Promise<*|*[]>}
   */
  async getAllCars() {
    const response = await this.get(
      'warehouses',
    );

    return Array.isArray(response)
      ? response.reduce((acc, warehouse) => {
        acc = acc.concat(((((warehouse || {}).cars || {}).vehicles || [])
          .map(( vehicle) => {
           const { _id, ...vehicleNoId } = { ...vehicle, id: vehicle._id } // don't like the underscore on the _id nor wanted to change the source data
           return vehicleNoId;
          })
        ));
        return acc;
      }, [])
      : [];
  }

  async getVehicleById(id) {
    const allCars = await this.getAllCars();

    return allCars.find(vehicle => vehicle.id === +id);
  }
}

module.exports = CarsApi;
