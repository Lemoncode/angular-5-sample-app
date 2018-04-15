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

## Steps.
### 1. Inside models we are going to create a new model for seller. Create the file `src/app/models/seller.model.ts`
```typescript
export interface ISeller {
  id: number;
  name: string;
  price: number;
  amount: number;
  isAvailable: boolean;
}
```

### 2. Now modify `game.model.ts` to have a new property, a collection of sellers.

```diff
+import { ISeller } from './seller.model';

export class Game {
  name: string;
  dateRelease: Date;
  imageUrl?: string;
+  sellers?: ISeller[];

  constructor(
    name?: string,
    dateRelease?: string,
    imageUrl?: string,
+    sellers?: ISeller[]
  ) {
    this.name = name;
    this.dateRelease = new Date(dateRelease);
    this.imageUrl = imageUrl;
+    this.sellers = sellers;
  }
...
}
```

### 3.  Create a new folder call it services. `src/app/services/`

* Now we can create a new file `src/app/services/gameStock.service.ts`, inside this file, we can place the following code:

```typescript
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';

const GAMES: Game[] = [
  new Game(
    'Super Mario Bros',
    '13 September 1985',
    // tslint:disable-next-line:max-line-length
    'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
    [
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
  ),
  new Game(
    'Legend of Zelda',
    '21 February 1986',
    // tslint:disable-next-line:max-line-length
    'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
    [
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
  ),
  new Game(
    'Sonic',
    '26 June 1981',
    'https://i.ytimg.com/vi/dfFd7Bu6xnc/hqdefault.jpg',
  ),
];

@Injectable()
export class GameStockService {
  getGames(): Game[] {
    return GAMES;
  }

  getGame(name: string): Game {
    return GAMES.find((game) => game.name === name);
  }

  getGameSellers(name: string): ISeller[] {
    return this.getGame(name).sellers || null;
  }
}

```

### 4. With this on place, let's register our new service on `app.module.ts`

```diff
...
+import { GameStockService } from './services/gameStock.service';

@NgModule({
  ...
  providers: [
+    GameStockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 5. With this on place, we can use the service in `app.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.model';
+import { GameStockService } from './services/gameStock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
-  title = 'Displaying Collections Demo';
+  title = 'User Interactions Demo';
  games: Game[];

-  constructor() {
+  constructor(private gameStockService: GameStockService)
  }

  ngOnInit() {
-    this.games = [
-      new Game(
-        'Super Mario Bros',
-        '13 September 1985',
-        // tslint:disable-next-line:max-line-length
-        'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
-      ),
-      new Game(
-        'Legend of Zelda',
-        '21 February 1986',
-        // tslint:disable-next-line:max-line-length
-        'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
-      ),
-      new Game(
-        'Sonic',
-        '26 June 1981',
-        'https://i.ytimg.com/vi/dfFd7Bu6xnc/hqdefault.jpg',
-      ),
-    ];
+    this.games = this.gameStockService.getGames();
  }
}

``` 
* Run the application at this point to verify that everything goes fine.

### 6. So far, so good. We are going to show how to handle that the games get displayed by the user interaction, we have to edit the `app.component.html`, `app.component.css` and `app.component.ts`.

* In `app.component.html`

```html
<div class="container">
  <h1>
    {{title}}
  </h1>
  <div class="row">
    <div class="col">
      <button class="btn btn-primary btn-sm float-right" (click)="show=!show">Show games!</button>
    </div>
  </div>
  <div class="games-container" *ngIf="show">
    <div *ngFor="let game of games">
        <app-game-summary [game]=game></app-game-summary>
    </div>
  </div>
</div>
```

* In `app.component.css`

```css
.games-container {
  padding-top: 3rem;
}
```

* In `app.component.ts`

```diff
...
export class AppComponent implements OnInit {
  title = 'User Interactions Demo';
  games: Game[];
+  show = true;
...
}
```

* Show results to students.

### 7. We have already created a new model for sellers, `seller.model.ts`. Our goal is to select a game and display the related sellers of that game. 

* Let's create a new component that will render the related sellers fo a game, `game-sellers.component.ts`. We place it inside game folder.

* In `bash` from `src/app/game`
```bash
ng generate component game-sellers
``` 
* Remove `game-sellers.component.css`
* Remove `game-sellers.component.spec.ts`

```typescript
import { Component, Input } from '@angular/core';
import { ISeller } from '../models/seller.model';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html',
})
export class GameSellersComponent {
  @Input() sellers: ISeller[];
  @Input() gameName: string;
}
```

* Now let's add a view for this component. `game-sellers.component.html`

```html
<div class="row">
  <div class="col-3">{{gameName}}</div>
  <div class="col-9">
    <div *ngFor="let seller of sellers">
      <span>{{seller.name}}</span>
    </div>
  </div>
</div>
```

### 8.We have to get notified when a game is selected (click on it), so we are going to generate a new custom event, in `game-summary.component.ts\game-summary.component.html`, so its parent get notified when the game has been clicked. 

```diff
+<div class="card card-block bg-faded" (click)="selectedGame(game.name)">
  <div class="row">
    <div class="col">
      <label>Name:</label>
      <span>{{game.name}}</span>
    </div>
    <div class="col">
      <label>Years from release:</label>
      <span>{{game.getYearsFromRelease()}}</span>
    </div>
    <div class="col">
      <img class="img-fluid" [src]="game.imageUrl" alt="game image">
    </div>
  </div>
+</div>
```
```typescript
import { Component, Input } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html'
})
export class GameSummaryComponent {
  @Input() game: Game;

  selectedGame(gameName: string) {
    console.log(gameName);
  }
}
```
* Show current results on browser.

### 9. Now we are going to notify the parent to handle, the selected game. In `game-summary.component.ts`, we introduce the following changes:

```diff
-import { Component, Input } from '@angular/core';
+import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html'
})
export class GameSummaryComponent {
  @Input() game: Game;
+  @Output() gameChange: EventEmitter<string> = new EventEmitter<string>();
+  
  selectedGame(gameName: string) {
-    console.log(gameNameElement.value);
+   this.gameChange.emit(gameName);
  }
}
```
### 11. Now we have to handle this on the parent, in this case `app.component.*`

```diff
<div class="container">
  <h1>
    {{title}}
  </h1>
  <div class="row">
    <div class="col">
      <button class="btn btn-primary btn-sm float-right" (click)="show=!show">Show games!</button>
    </div>
  </div>
  <div class="games-container" *ngIf="show">
    <div *ngFor="let game of games">
-        <app-game-summary [game]=game></app-game-summary>
+        <app-game-summary (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
    </div>
  </div>
</div>

```

```diff
import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.model';
+import { ISeller } from './models/seller.model';
import { GameStockService } from './services/gameStock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Interactions Demo';
  games: Game[];
+  selectedGameInfo: string;
+  sellers: ISeller[];
  show = true;

  constructor(private gameStockService: GameStockService) {
  }

+  gameChangeHandler($event: any) {
+    const sellers = this.gameStockService.getGameSellers($event);
+    const selectedGame = this.gameStockService.getGame($event);
+    this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;
+    this.sellers = (sellers && sellers.length > 0) ? sellers : [];
+  }

  ngOnInit() {
    this.games = this.gameStockService.getGames();
  }
}
```
### 10. For last we are going to render the related sellers to the selected game.

```diff
<div class="container">
  <h1>
    {{title}}
  </h1>
  <div class="row">
    <div class="col">
      <button class="btn btn-primary btn-sm float-right" (click)="show=!show">Show games!</button>
    </div>
  </div>
  <div class="games-container" *ngIf="show">
    <div *ngFor="let game of games">
        <app-game-summary (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
    </div>
  </div>
+  <app-game-sellers [gameName]="selectedGameInfo" [sellers]="sellers"></app-game-sellers>
</div>
```
