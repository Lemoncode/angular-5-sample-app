# GameCatalog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## NOTE: In this demo we are going to load data by using a Web API that will be running on node.

## Steps to create the Web API

### A. Create a new folder call `game-catalog/server`

### B. Create a new folder call `server/models`. Inside this folder, create the following files: 
* `gameModel.js`
```javascript
const GAMES = [
    {
        name: 'Super Mario Bros',
        dateRelease: '13 September 1985',
        imageUrl: 'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
        sellers: [
            {
                id: 1,
                name: 'Old shop',
                price: 95,
                amount: 2,
                isAvailable: true,
            },
            {
                id: 2,
                name: 'New shop',
                price: 115,
                amount: 1,
                isAvailable: true,
            },
            {
                id: 3,
                name: 'Regular shop',
                price: 135,
                amount: 0,
                isAvailable: false,
            }
        ]
    },
    {
        name: 'Legend of Zelda',
        dateRelease: '21 February 1986',
        imageUrl: 'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
        sellers: [
            {
                id: 3,
                name: 'Old shop',
                price: 125,
                amount: 0,
                isAvailable: false,
            },
            {
                id: 4,
                name: 'New shop',
                price: 145,
                amount: 1,
                isAvailable: true,
            },
        ]
    },
    {
        name: 'Sonic',
        dateRelease: '26 June 1981',
        imageUrl: 'https://www-sonicthehedgehog-com-content.s3.amazonaws.com/test/Sonic_Mania_Block_3_video_1_2.jpg',
    },
];

const getGames = () => GAMES;
const getGame = (name) => GAMES.find((game) => game.name === name);
const addGame = (game) => {
    const imageUrl = (game.imageUrl) ? game.imageUrl : 'https://c1.staticflickr.com/6/5447/18686626819_224c6414ce_m.jpg';
    const gameWithImageUrlResolved = Object.assign({}, game, imageUrl);
    GAMES.push(gameWithImageUrlResolved);
};
const getGameIndexByName = (name) => GAMES.findIndex((g) => g.name === name);
const updateGame = (game) => {
    const gameIndex = getGameIndexByName(game.name);
    if (gameIndex > -1) {
        GAMES[gameIndex] = game;
    }
};
const deleteGame = (name) => {
    const gameIndex = getGameIndexByName(name);
    if (gameIndex > -1) {
        GAMES.splice(gameIndex, 1);
    }
}

module.exports = {
    getGames,
    getGame,
    addGame,
    updateGame,
    deleteGame
}

```
* `sellerCategoryModel.js`
```javascript
const SELLERCATEGORIES = [
    {
      id: 1,
      name: 'National',
      taxes: [
        {
          id: 1,
          name: 'I.V.A.',
          amount: 0.21,
        },
        {
          id: 3,
          name: 'exempt',
          amount: 0,
        }
      ],
    },
    {
      id: 2,
      name: 'European',
      taxes: [
        {
          id: 2,
          name: 'european external tariff',
          amount: 0.17,
        },
        {
          id: 3,
          name: 'exempt',
          amount: 0,
        }
      ]
    },
    {
      id: 3,
      name: 'Foreign',
      taxes: [
        {
          id: 4,
          name: 'foreign external tariff',
          amount: 0.47,
        },
        {
          id: 5,
          name: 'special tariff',
          amount: 0.26,
        }
      ]
    }
  ];

const getSellerCategories = () => SELLERCATEGORIES;

module.exports = {
    getSellerCategories
}

```
* `userModel.js`
```javascript
const user = {
    userName: 'jaisal',
    isAuthenticated: false
};

const getLogged = (userClient) => {
    user.isAuthenticated = userClient.userName === user.userName;
    return user.isAuthenticated;
};

const isUserAuthenticated = () => {
    return user.isAuthenticated;
};

const logout = () => {
    user.isAuthenticated = false;
    return user.isAuthenticated;
};

const updateUser = (userClient) => {
    user.userName = userClient.userName;
};

const getUser = () => {
    return user.userName;
};

module.exports = {
    getLogged,
    isUserAuthenticated,
    logout,
    updateUser,
    getUser
};

```
### C. Create a new folder `server/routes`. And place the following files:
* `gameRoutes.js`
```javascript
const express = require('express'),
    gameRouter = express.Router(),
    Game = require('../models/gameModel');

const routes = () => {
    gameRouter.route('/')
        .post((req, res) => {
            const game = {
                name: req.body.name,
                dateRelease: req.body.dateRelease,
                imageUrl: req.body.imageUrl
            };
            console.log(game);
            Game.addGame(game);
            res.status(201);
            res.send(game);
        })
        .get((req, res) => {
            res.json(Game.getGames());
        });
        // TODO: Use middleware to resolve game.
        gameRouter.route('/:id')
            .get((req, res) => {
                const game = Game.getGame(req.params.id);
                if (game) {
                    res.json(game);
                } else {
                    res.status(404).send('no game found');
                }
            })
            .put((req, res) => {
                // NOTE: Any seller will be remove!!!
                const game = {
                    name: req.body.name,
                    dateRelease: req.body.dateRelease,
                    imageUrl: req.body.imageUrl
                };
                Game.updateGame(game);
                res.json(game);
            })
            .delete((req, res) => {
                Game.deleteGame(req.params.id);
                res.status(204).send('remove');
            });
    
    return gameRouter; 
};

module.exports = routes;

```
* `sellerCategoryRoutes.js`
```javascript
const express = require('express'),
    sellerCategoryRouter = express.Router();
    SellerCategory = require('../models/sellerCategoryModel');
    
const routes = () => {
    sellerCategoryRouter.route('/')
        .get((req, res) => {
            res.json(SellerCategory.getSellerCategories());
        });
    
    return sellerCategoryRouter;
};

module.exports = routes;

```
* `userRoutes.js`
```javascript
const express = require('express'),
    userRouter = express.Router();
    User = require('../models/userModel');

const routes = () => {
    userRouter.route('/')
        .get((req, res) => {
            if (User.isUserAuthenticated()) {
                res.json(User.geUser());
            } else {
                res.status(403).send('forbidden');
            }
        })
        .post((req, res) => {
            res.json(User.getLogged(req.body));
        })
        .put((req, res) => {
            if (User.isUserAuthenticated()) {
                User.updateUser(req.body);
                res.status(201).send('ok');
            } else {
                res.status(403).send('forbidden');
            }
        });
    
    userRouter.route('/logout')
        .post((req, res) => {
            res.json(User.logout());
        });
    
    userRouter.route('/authenticated')
        .get((req, res) => {
            res.json(User.isUserAuthenticated());
        });

    return userRouter;
}

module.exports = routes;

```
### D. Create a new file `server/index.js`
```javascript
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const gameRouter = require('./routes/gameRoutes');
const sellerCategoryRouter = require('./routes/sellerCategoryRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/games', gameRouter());
app.use('/api/sellercategories', sellerCategoryRouter());
app.use('/api/users', userRouter());

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);

```
### E. Create a new configuration file for proxy. `game-catalog/proxy.conf.json`

```json
{
    "/api": {
        "target": "http://localhost:3000",
        "secure": false
    }
}

```
### F. Install server dependencies

```bash
$npm install express body-parser --save
```

### G. For last let's modify the `package.json`, to get the server started.

```diff
{
  "name": "game-catalog",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
-   "start": "ng serve",
+   "start": "node ./server/index.js | ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  ....
}

```

## Steps.

* https://angular.io/guide/http

### 1. Before you can use the `HttpClient`, you need to install the `HttpClientModule` which provides it. This can be done in your application module, and is only necessary once. 

```diff app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
 
// Import HttpClientModule from @angular/common/http
+import {HttpClientModule} from '@angular/common/http';
 
@NgModule({
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
+    HttpClientModule,
  ],
})
....
```


### 2. Open `services/sellerCategory.service.ts`

```diff 
import { Injectable } from '@angular/core';
import { ISellerCategory } from '../models/sellerCategory.model';
+import { HttpClient } from '@angular/common/http';
+import { Observable } from 'rxjs/Observable';

-const SELLERCATEGORIES: ISellerCategory[] = [
-  {
-    id: 1,
-    name: 'National',
-    taxes: [
-      {
-        id: 1,
-        name: 'I.V.A.',
-        amount: 0.21,
-      },
-      {
-        id: 3,
-        name: 'exempt',
-        amount: 0,
-      }
-    ],
-  },
-  {
-    id: 2,
-    name: 'European',
-    taxes: [
-      {
-        id: 2,
-        name: 'european external tariff',
-        amount: 0.17,
-      },
-      {
-        id: 3,
-        name: 'exempt',
-        amount: 0,
-      }
-    ]
-  },
-  {
-    id: 3,
-    name: 'Foreign',
-    taxes: [
-      {
-        id: 4,
-        name: 'foreign external tariff',
-        amount: 0.47,
-      },
-      {
-        id: 5,
-        name: 'special tariff',
-        amount: 0.26,
-      }
-    ]
-  }
-];

+@Injectable()
export class SellerCategoryService {
+  constructor(private http: HttpClient) {}
+ 
-  getSellerCategories() {
+  getSellerCategories(): Observable<ISellerCategory[]> {
-    return SELLERCATEGORIES;
+    return this.http.get<ISellerCategory[]>('/api/sellercategories');
+  }
}
```

* Now it's time to run build. What happens is that the build it`s broken right now.

### 3. Let's fix this issue to get build running again. Open `app/seller/create-seller/create-seller.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { SellerCategoryService } from '../../services/sellerCategory.service';
import { ISellerCategory } from '../../models/sellerCategory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
+import { Observable } from 'rxjs/Observable';

const nameValid = (control: FormControl): { [key: string]: any } => {
  const firstLetter = control.value.toString()[0];
  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
    { 'nameValid' : 'invalid name' } : null;
};


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles: [`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any> = []; // TODO: Create Lookup entity.
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
  name: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  onChangeCategory(value) {
    this.taxLookupCollection = this.taxesByCategory
      .filter((tax) => tax.categoryId === +value)
      .map(
        (t) => ({
          id: t.id,
          name: t.name
        })
      );
    this.tax.enable();
  }

  saveSeller(formValues) {
    console.log(formValues);
  }

  ngOnInit() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.name = new FormControl('', [ Validators.required, nameValid]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
      name: this.name
    });
    this.tax.disable();
-    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
+    this.sellerCategoryService.getSellerCategories()
+      .subscribe((categories) => {
        this.categoryLookupCollection = categories
          .map(
            (category) => ({
              id: category.id,
              name: category.name,
            })
          );

        let taxesByCategory: Array<any> = [];
        categories.forEach((category) => {
          const taxesByCategoryTemp = category.taxes.map((tax) => ({
            categoryId: category.id,
            id: tax.id,
            name: tax.name
          }));
          taxesByCategory = taxesByCategory.concat(taxesByCategoryTemp);
        });
        this.taxesByCategory = taxesByCategory;
+        }, (err) => console.log(err));
  }
}

```
* Now let's make a new build.

###  4. For last we are going to do a little refactor changing to a private method, where we resolve the lookup entites

```diff
import { Component, OnInit } from '@angular/core';
import { SellerCategoryService } from '../../services/sellerCategory.service';
import { ISellerCategory } from '../../models/sellerCategory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

const nameValid = (control: FormControl): { [key: string]: any } => {
  const firstLetter = control.value.toString()[0];
  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
    { 'nameValid' : 'invalid name' } : null;
};


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles: [`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any> = []; // TODO: Create Lookup entity.
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
  name: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  onChangeCategory(value) {
    this.taxLookupCollection = this.taxesByCategory
      .filter((tax) => tax.categoryId === +value)
      .map(
        (t) => ({
          id: t.id,
          name: t.name
        })
      );
    this.tax.enable();
  }

  saveSeller(formValues) {
    console.log(formValues);
  }

  ngOnInit() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.name = new FormControl('', [ Validators.required, nameValid]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
      name: this.name
    });
    this.tax.disable();
+    this.resolveLookupEntities();
  }

+  private resolveLookupEntities() {
+    this.sellerCategoryService.getSellerCategories()
+    .subscribe((categories) => {
+      this.categoryLookupCollection = categories
+      .map(
+        (category) => ({
+          id: category.id,
+          name: category.name,
+        })
+      );
+
+    let taxesByCategory: Array<any> = [];
+    categories.forEach((category) => {
+      const taxesByCategoryTemp = category.taxes.map((tax) => ({
+        categoryId: category.id,
+        id: tax.id,
+        name: tax.name
+      }));
+      taxesByCategory = taxesByCategory.concat(taxesByCategoryTemp);
+    });
+    this.taxesByCategory = taxesByCategory;
+    }, (err) => console.log(err));
+  }
}

```
