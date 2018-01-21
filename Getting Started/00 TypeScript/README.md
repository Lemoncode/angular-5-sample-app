Create basic structure

00 TYPESCRIPT
src 
index.html
.gitignore
package.json

1. Install dev dependencies for demos:

npm install webpack webpack-dev-server typescript ts-loader --save-dev

2. Add index.html markup

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
</head>

<body>

  <div>Hello</div>
  <script></script>
</body>
</html>

3. Add tsconfig.json

This file contains instructions on how the typescript has to be compiled.

{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true
    },
    "exclude": [
        "node_modules"
    ]
}

4. Add webpack.config.js 

This file contains instructions for webpack, so it can do the built.

var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: {
        app: './main.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }
};

5. We need a couple of things to be done before we can go ahead

First in index.html, lets refer the output app.js

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
</head>

<body>

  <div>Hello</div>
  <script src="main.js"></script>
</body>
</html>

Then the main poit to get started is main.ts, because the definition context is src, lets
add main.ts to this folder.

6. Ok then, just a last step to get an dive into code. 

In packagege.json under scripts we can type commmands that can get executed by node

"scripts": {
    "start": "webpack-dev-server --watch --inline",
}

then from console we can type 

npm start and everything gets started.

7. Lets try some features of TypeScript

Now lets  add two new folders: models, services. 

In models, lets create 

```typescript car.model.ts 

export enum Colors { Black, Blue, Red, White }

export interface ICar {
    model: string;
    power: number;
    color: Colors;
}
```

```typescript car.service.ts

import { ICar, Colors } from '../models/car.model';

export interface ICarService {
    getCars():ICar[];
    getCarByModel(model: string): ICar;
    getCarsSorted(sortBy: any):ICar[];
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
```

```typescript main.ts

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
```