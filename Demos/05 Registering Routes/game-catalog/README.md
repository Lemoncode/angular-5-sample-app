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

## NOTE: In this demo we are going to create the necessary infrastructure for routing.

1. We create `app.routes` that will contain the routes for the main module.
2. Then we are going to extract the `create-game.component.*` to its own route and we are going to create a  `games-list.component.*`, that will contains the games (our `app.component.*` right now).
3. In order to get routing working we have to introduce a new directive `router-outlet`. This directive is responsible for inject the content dependeing on the route.

## Steps.

### 1. Creating `games-list.component.*`. Place it in game folder.

* Open `bash` in `src/app/game`.

```bash
ng generate component game-list
```
* Remove `games-list.component.css`
* Remove `games-list.component.spec.ts`

* It's the same html as `app.component.hml`, but without the form, and the button that hides content.
```html
<div class="container">
  <h1>
    {{title}}
  </h1>
  <div *ngFor="let game of games">
    <app-game-summary (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
  </div>
  <app-game-sellers [gameName]="selectedGameInfo" [sellers]="sellers"></app-game-sellers>
</div>
```
* It's the same as `app.component.ts`, but without the property show, changing references route and removing styles.
```typescript
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

  createGameEventHandler($event: any) {
    const game = this.mapper($event);
    this.gameStockService.addGame(game);
    this.loadGames();
  }

  private mapper(formValues: any): Game {
    return new Game(formValues.name, formValues.daterelease, formValues.imageurl);
  }

  ngOnInit() {
    this.loadGames();
  }

  private loadGames() {
    this.games = this.gameStockService.getGames();
  }
}
```

### 2. Now we are going to create a new file that will host our routes for the `app.module`, lets create this file at the same level as `app.module`, `/src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const appRoutes: Routes = [

];
```

### 3. Now we can create a new route for this new kid.

```diff
import { Routes } from '@angular/router';
+import { GamesListComponent } from './game/games-list.component';

export const appRoutes: Routes = [
+  { path: 'games', component: GamesListComponent }
];
```

### 5. Lets create as well the default route

```diff
import { Routes } from '@angular/router';
import { GamesListComponent } from './game/games-list.component';

export const appRoutes: Routes = [
  { path: 'games', component: GamesListComponent },
+  { path: '', redirectTo: '/games', pathMatch: 'full' }
];

```
### 4. Ok now we have to declare our routes in the app.module.ts

```diff
....
+import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game/game-sellers.component';
import { CreateGameComponent } from './game/create-game.component';
import { GamesListComponent } from './game/games-list.component';
import { GameStockService } from './services/gameStock.service';

+import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    ...
    GamesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
+    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 5. Now we have to transform our app.component.html to host router-outlet directive.

```html
<router-outlet></router-outlet>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

* Now it's time to check that our app runs and shows `games-list.component.*`

### 6. Lets create now a route for create-customer.component.ts

``` diff
import { Routes } from '@angular/router';
import { GamesListComponent } from './game/game-list/games-list.component';
+import { CreateGameComponent } from './game/create-game/create-game.component';

export const appRoutes: Routes = [
  { path: 'games', component: GamesListComponent },
+  { path: 'games/new', component: CreateGameComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];
```
* NOTE: The order on routes it's important!!!
