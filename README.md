# Lion Garage

Tiny lit-element based app about a fictional garage

### Features

* Cars:
  * Show cars from the garage ordered by the date they were added in the garage
  * Present car details in a modal dialog
  * Add a car to shopping cart

* Shopping cart:
  * Show cars from shopping cart
  * Delete cars from shopping cart 
  
#### Future improvements

* Add unit tests :D
* Add progress indicators
* Show car location on map
* Maybe use some api to fetch image using car data.  
* Create own theme by extending @lion components
* Dockerize or deploy to AWS.

## Install

Run `npm i`.

The used npm version is `6.13.4`.

## Run development

Obs: 
* Development was conducted using node `v14.16.1` with npm `6.14.22`. I recommend using the same for node at least.
* The testing browser was Chrome v90.
Run client and server in separate terminal windows.

### Run server

Run `npm run start-server`.

### Run client

Run `npm start`

### Development location

Open [localhost:8000](http://localhost:8000)

## Production 

For testing purposes the build will move the rollup output under the apollo-server and will serve the files from the same static express as the json file.

Run `npm run build` then navigate to [localhost:3001/public](http://localhost:3001/public)
