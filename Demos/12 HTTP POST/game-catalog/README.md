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

## NOTE: In this demo we are going to use POST and PUT operations.
## Steps.

### 1. Start by refactor `gameStock.service.ts` to grab customers from our Web API.

* Remove moc data

```typescript
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class GameStockService {
  constructor(private http: HttpClient) {}
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8000/api/games/');
  }

  getGame(name: string): Observable<Game> {
    return this.http.get<Game>(`http://localhost:8000/api/games/${name}`);
  }
  // https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
  getGameSellers(name: string): Observable<ISeller[]> {
    return this.getGame(name)
      .pipe(
        map(g => g.sellers)
      );
  }

  addGame(game: Game): void {
    // GAMES.push(game);
  }
}

``` 
* It's time to run a build `ng build`.
* Now we are going to have a lot or errors, due to typings. Let's solve this problem.

### 2. Let's start by solving the problems on `app/game/games-list.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
import { GameStockService } from '../services/gameStock.service';
+import { Observable } from 'rxjs/Observable';

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
-    const sellers = this.gameStockService.getGameSellers($event);
+    this.gameStockService.getGameSellers($event)
+      .subscribe((sellers) => this.sellers = (sellers && sellers.length > 0) ? sellers : []);
-    const selectedGame = this.gameStockService.getGame($event);
-    this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;

-    this.sellers = (sellers && sellers.length > 0) ? sellers : [];
+    this.gameStockService.getGame($event)
+      .subscribe(
+        (selectedGame) => this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`
+      );
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
-    this.games = this.gameStockService.getGames();
+    this.gameStockService.getGames()
+      .subscribe((games) => this.games = games);
  }
}

```

### 3. Now with this fixed, let's fix the issues on `app/game/game-sellers/game-sellers.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameStockService } from '../../services/gameStock.service';
import { ISeller } from '../../models/seller.model';
+import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-sellers-details',
  templateUrl: './game-sellers-details.component.html'
})
export class GameSellersDetailsComponent implements OnInit {
  gameName: string;
  sellers: ISeller[];
  addMode = false;
  filterBy = 'all';
  sortBy = 'asc';
  constructor(private route: ActivatedRoute, private gameStockService: GameStockService) { }

  toggleAddSeller() {
    this.addMode = !this.addMode;
  }

  ngOnInit() {
-    const game = this.gameStockService.getGame(this.route.snapshot.params['id']);
-    this.gameName = game.name;
-    this.sellers = game.sellers;
+    this.gameStockService.getGame(this.route.snapshot.params['id'])
+      .subscribe((game) => {
+        this.gameName = game.name;
+        this.sellers = game.sellers;
+      });
  }
}

```
* Now it's time to check that the build still runing and the app it's working.
* Oh, oh, there is a problem because or game on server it's not exactly the same as the game on client, let's fix this.

### 4. Now open `app/services/gameStock.service.ts`, and let's make some modifications to make this work.

```diff
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/find';
import 'rxjs/add/observable/throw';

@Injectable()
export class GameStockService {
  constructor(private http: HttpClient) { }

+  mapGame(game: any): Game {
+    return (game.sellers && game.sellers.length) ?
+            new Game(
+              game.name,
+              game.dateRelease.toString(),
+              game.imageUrl,
+              game.sellers
+            ) :
+            new Game(
+              game.name,
+              game.dateRelease.toString(),
+              game.imageUrl
+            );
+  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8000/api/games/')
+      .pipe(
+          flatMap(g => g),
+          map(this.mapGame),
+          merge(s => s),
+          skip(1),
+          reduce((acc, value) => {
+            return [...acc, value];
+          }, [])
+        );
  }

  getGame(name: string): Observable<Game> {
    return this.http.get<Game>(`http://localhost:8000/api/games/${name}`);
  }
  // https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
  getGameSellers(name: string): Observable<ISeller[]> {
    return this.getGame(name)
      .pipe(
        map(g => g.sellers)
      );
  }

  addGame(game: Game): void {
    // GAMES.push(game);
  }
}

```
### 5. Now open `app/game/games-list.component.ts`, so we can fix a minor change.

```diff
gameChangeHandler($event: any) {
    this.gameStockService.getGameSellers($event)
      .subscribe((sellers) => this.sellers = (sellers && sellers.length > 0) ? sellers : []);
    this.gameStockService.getGame($event)
      .subscribe(
        (selectedGame) => {
+          // TODO: Refactor this. Extract mapper to its own service.
+          const mappedGame = this.gameStockService.mapGame(selectedGame);
+          this.selectedGameInfo = `${mappedGame.name}, Age:${mappedGame.getYearsFromRelease()}`;
-          this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;
        }
      );
  }

```
### 6. Since we retrieve the data from a service, when the component `seller-list.component.*` it's initialize, the sellers are not already return to fix this, we have to make a change on this component.

```diff seller-list.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent implements OnChanges {
  @Input() sellers: ISeller[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSellers: ISeller[];

  ngOnChanges(changes: SimpleChanges): void {
+    if (changes['sellers']) {
+      this.visibleSellers = this.sellers;
+    }
-    if (changes['filterBy']) {
+    if (changes['filterBy'] && this.sellers) {
      this.visibleSellers = this.filterSellers(changes['filterBy'].currentValue);
    }
-    if (changes['sortBy']) {
+    if (changes['sortBy'] && this.sellers) {
      this.sortSellers(changes['sortBy'].currentValue);
    }
  }

  private filterSellers = (filter: string): ISeller[] => (
    this.sellers.filter(
      (s) => filter === 'all' || s.amount > 0
    )
  );

  private sortSellers = (sortBy: string): void => {
    this.visibleSellers.sort(this.sortSellersReaction[sortBy]);
  }

  private sortSellersReaction = {
    ['asc']: (current: ISeller, after: ISeller) => after.price - current.price,
    ['desc']: (current: ISeller, after: ISeller) => current.price - after.price
  };
}


```

### 7. Now for last we are going to add a new `game` on server. Opne `app/services/gameStock.service.ts`

```diff
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
-import { HttpClient } from '@angular/common/http';
+import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  map,
  flatMap,
  combineAll,
  merge,
  reduce,
  skip,
  tap
} from 'rxjs/operators';

@Injectable()
export class GameStockService {
  constructor(private http: HttpClient) { }

  mapGame(game: any): Game {
    return (game.sellers && game.sellers.length) ?
      new Game(
        game.name,
        game.dateRelease.toString(),
        game.imageUrl,
        game.sellers
      ) :
      new Game(
        game.name,
        game.dateRelease.toString(),
        game.imageUrl
      );
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8000/api/games/')
      .pipe(
      flatMap(g => g),
      map(this.mapGame),
      merge(s => s),
      skip(1),
      reduce((acc, value) => {
        return [...acc, value];
      }, [])
      );
  }

  getGame(name: string): Observable<Game> {
    return this.http.get<Game>(`http://localhost:8000/api/games/${name}`);
  }
  // https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
  getGameSellers(name: string): Observable<ISeller[]> {
    return this.getGame(name)
      .pipe(
      map(g => g.sellers)
      );
  }

-  addGame(game: Game): void {
+  addGame(game: Game): Observable<Game> {
+    const httpOptions = {
+      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
+    };
+
+    return this.http.post<Game>(
+      'http://localhost:8000/api/games/',
+       game,
+       httpOptions
+    );
+  }
}

```

### 7. And subscribe on `create-game.component.ts`. 

```diff
....
createGame(formValues: any) {
    this.isDirty = false;
    const game = this.mapper(formValues);
+    this.gameStockService.addGame(game)
+      .subscribe((r) => {
+        this.router.navigate(['/games']);
+      });
  }
....
```
