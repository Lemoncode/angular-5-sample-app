import { ICar, Colors } from './models/car.model';
import { CarService } from './services/car.service';

const logger = (car: ICar) => console.log(`
    Model: ${car.model}, Power: ${car.power}, Color: ${car.color}
`); 

document.addEventListener('DOMContentLoaded', (event) => {
    const carService: CarService = new CarService();
    const cars: ICar[] = carService.getCars();
    cars.forEach(logger);
});