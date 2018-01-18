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

## NOTE: In this demo we are going to create a navigation bar.
## Steps.

### 1. We start by creating a new component `navbar`. 

* Open bash from `src/app`

```bash
ng generate component navbar
```
* Remove `navbar.component.css`
* Remove `navbar.component.spec.ts`

```html
<div class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" >App Games</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li>
          <a>
            All Games
          </a>
        </li>
        <li>
            <a>
              Create Game
            </a>
        </li>
      </ul>
      <div class="navbar-header navbar-right">
        <ul class="nav navbar-nav">
         <li>
            <a>
                Login
            </a>
         </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav { font-size: 15px; }
    li > a.active { color: #F97924 }
  `]
})

export class NavbarComponent {}

```
### 2. Modify `app.component.html`

```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

### 3. Now that we have the basic, html and component lets add some links to the navbar.

```diff
<ul class="nav navbar-nav">
  <li>
-    <a>
+    <a [routerLink]="['/games']">  
      All Games
    </a>
  </li>
  <li>
-      <a>
+      <a [routerLink]="['/games/new']">
        Create Game
      </a>
  </li>
</ul>
```
* Test the app and the navigation.

### 4. Now if we add a new game it does not be reflected on `games-list.component.ts`, let's fix this.

* Remove code from `games-list.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
import { GameStockService } from '../services/gameStock.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html'
})
export class GamesListComponent implements OnInit {
  title = 'User Interactions Demo';
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];

  constructor(private gameStockService: GameStockService) {
  }

  gameChangeHandler($event: any) {
    const sellers = this.gameStockService.getGameSellers($event);
    const selectedGame = this.gameStockService.getGame($event);
    this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;
    this.sellers = (sellers && sellers.length > 0) ? sellers : [];
  }

-  createGameEventHandler($event: any) {
-    const game = this.mapper($event);
-    this.gameStockService.addGame(game);
-    this.loadGames();
-  }

-  private mapper(formValues: any): Game {
-    return new Game(formValues.name, formValues.daterelease, formValues.imageurl);
-  }

  ngOnInit() {
    this.loadGames();
  }

  private loadGames() {
    this.games = this.gameStockService.getGames();
  }
}

```
* Now modify create-game.component.ts

```diff
-import { Component, Output, EventEmitter } from '@angular/core';
+import { Component } from '@angular/core';
+import { GameStockService } from '../services/gameStock.service';
+import { Game } from '../models/game.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
+  constructor(private gameStockService: GameStockService) {}
-  @Output() createGameEvent: EventEmitter<any> = new EventEmitter<any>();
+
  createGame(formValues: any) {
-    this.createGameEvent.emit(formValues);
+    const game = this.mapper(formValues);
+    this.gameStockService.addGame(game);
  }
+
+ private mapper(formValues: any): Game {
+    return new Game(formValues.name, formValues.daterelease, formValues.imageurl);
+  }
}
```
* Check that it's working as expected.

### 5. With this on place we are going to create an new route, to get the sellers related with one game. Let's register a new route for that purpose. In `app.routes.ts`

* NOTE: Order the routes in the same way.

```typescript
import { Routes } from '@angular/router';
import { GameListComponent } from './game/game-list/game-list.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { CreateSellerComponent } from './seller/create-seller/create-seller.component';
import { GameSellersComponent } from './game/game-sellers/game-sellers.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games/new', component: CreateGameComponent },
  { path: 'games', component: GameListComponent },
  { path: 'games/:id', component: GameSellersComponent },
  { path: 'seller/new', component: CreateSellerComponent }
];


```
### 6. Now we can add the routerLink in `games-list.component.html` to move to the desire `game-sellers-details.component`.

```diff
<div class="container">
-  <div *ngFor="let game of games">
+  <div *ngFor="let game of games" [routerLink]="['/games', game.name]">
    <app-game-summary (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
  </div>
-  <app-game-sellers [gameName]="selectedGameInfo" [sellers]="sellers"></app-game-sellers>
</div>
```

### 7. In the `GameSellersComponent` we have to handle the route param that is provided. For that it has to implement OnInit, and use ActivatedRoute from router.

```diff
-import { Component, Input } from '@angular/core';
-import { ISeller } from '../../models/seller.model';
+import { Component, OnInit } from '@angular/core';
+import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html'
})
-export class GameSellersComponent {
-  @Input() sellers: ISeller[];
-  @Input() gameName: string;
+export class GameSellersComponent implements OnInit {
+  constructor(private route: ActivatedRoute) {}
+
+  ngOnInit() {
+    console.log(this.route.snapshot.params['id']);
+  }
}
```
* Check that works. Nothing is displyed, but the name appears on console.

### 8. We want the sellers by game, so to achieve that we have to inject GameStockService 

```diff
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
+import { GameStockService } from '../../services/gameStock.service';

@Component({
  selector: 'app-game-sellers-details',
  templateUrl: './game-sellers-details.component.html'
})
export class GameSellersDetailsComponent implements OnInit {
-  constructor(private route: ActivatedRoute) {}
+  constructor(private route: ActivatedRoute, private gameStockService: GameStockService) {}

  ngOnInit() {
     console.log(this.route.snapshot.params['id']);
+    this.gameStockService.getGame(this.route.snapshot.params['id']);
  }
}
```

### 9. To close this demo we are going to add some functionallity to `GameSellersComponent`, so the user can add new `sellers` to the current `game`.

```diff
-<div class="row">
-  <div class="col-md-3">{{gameName}}</div>
-  <div class="col-md-9">
-    <div *ngFor="let seller of sellers">
-      <span>{{seller.name}}</span>
-    </div>
-  </div>
-</div>
+<div>
+  <h2>Game Details</h2>
+  <div class="row">
+    <div class="col-md-2">
+      <h3>Sellers</h3>
+    </div>
+    <div class="col-md-8">
+      <!-- TODO: Add the options for filtering and sorting -->
+    </div>
+    <div class="col-md-2">
+      <a (click)="toggleAddSeller()">Add Seller</a>
+    </div>
+    <div *ngIf="!addMode">
+      <h2>{{gameName}}</h2>
+      <div *ngFor="let seller of sellers">
+        <span>{{seller.name}}</span>
+      </div>
+    </div>
+    <app-create-seller *ngIf="addMode"></app-create-seller>
+  </div>
+</div>
```

```html game-sellers.component.html
<div>
  <h2>Game Details</h2>
  <div class="row">
    <div class="col-md-2">
      <h3>Sellers</h3>
    </div>
    <div class="col-md-8">
      <!-- TODO: Add the options for filtering and sorting -->
    </div>
    <div class="col-md-2">
      <a (click)="toggleAddSeller()">Add Seller</a>
    </div>
    <div *ngIf="!addMode">
      <h2>{{gameName}}</h2>
      <div *ngFor="let seller of sellers">
        <span>{{seller.name}}</span>
      </div>
    </div>
    <app-create-seller *ngIf="addMode"></app-create-seller>
  </div>
</div>
```


```diff game-sellers-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameStockService } from '../../services/gameStock.service';
+import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-game-sellers-details',
  templateUrl: './game-sellers-details.component.html'
})
export class GameSellersDetailsComponent implements OnInit {
+  gameName: string;
+  sellers: ISeller[];
+  addMode = false;
  constructor(private route: ActivatedRoute, private gameStockService: GameStockService) {}
+
+  toggleAddSeller() {
+    this.addMode = !this.addMode;
+  }
+
  ngOnInit() {
-    console.log(this.route.snapshot.params['id']);
-    this.gameStockService.getGame(this.route.snapshot.params['id']);
+    const game = this.gameStockService.getGame(this.route.snapshot.params['id']);
+    this.gameName = game.name;
+    this.sellers = game.sellers;
  }
}

```
* NOTE: Try to watch if works.
