import $ from 'jquery';
import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './data/fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';
import {Button} from './ui/button.js';

//let b = new Button('Click Me');
//console.log(b.appendToElement($));


let dataService = new FleetDataService();
dataService.loadData(fleet);

for (let car of dataService.cars) {
    console.log('car license: ' + car.license);
}

// for (let drone of dataService.drones) {
//     console.log('drone license: ' + drone.license);
// }

// for (let e of dataService.errors) {
//     console.log(e.message);
// }

// let car = dataService.getCarByLicense('AT9900');
// console.log(car);

// let carsSorted = dataService.getCarsSortedByLicense();
// for (let car of carsSorted) {
//     console.log('car license sorted: ' + car.license);
// }

// let filter = 'e'
// let carsByFilter = dataService.filterCarsByMake(filter);
// for (let car of carsByFilter) {
//     console.log(`car filtered by ${filter}: ` + car.make);
// }
