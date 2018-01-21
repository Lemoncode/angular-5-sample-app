import { ICar, Colors } from '../models/car.model';

export interface ICarService {
    getCars():ICar[];
    getCarByModel(model: string): ICar;
    getCarsSorted(sortBy: any): ICar[];
}

export class CarService implements ICarService {
    getCars(): ICar[] {
        return CARS;
    }

    getCarByModel(model: string): ICar {
        return CARS.find((c) => c.model === model);
    }
    getCarsSorted(sortBy: any): ICar[] {
        return CARS.slice(0)
            .sort(sortBy);
    }

}

const CARS: ICar[] = [
    {
        model: 'B1',
        power: 536,
        color: Colors.Black
    },
    {
        model: 'B2',
        power: 300,
        color: Colors.Red
    },
    {
        model: 'Z2',
        power: 100,
        color: Colors.White
    },
    {
        model: 'X2',
        power: 200,
        color: Colors.Blue
    },
]