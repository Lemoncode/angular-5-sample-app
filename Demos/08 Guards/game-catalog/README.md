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

## NOTE: In this demo we are going to create a an angular guard.
## Steps.

### 1. Lets start adding a new component, that will be called, when a given `game` in our app does not exists.

* Create a new folder `src/app/errors`. Inside we placed `404.component.ts`.

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <h1 class="errorMessage">400'd</h1>
  `,
  styles: [`
    .errorMessage {
      margin-top: 150px;
      font-size: 170px;
      text-align: center;
    }
  `]
})

export class Error404Component {}
```
### 2. Let's register this new component at `app.module.ts`

```diff
...
+import { Error404Component } from './errors/404.component';
import { GameStockService } from './services/gameStock.service';
import { SellerCategoryService } from './services/sellerCategory.service';

import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GamesListComponent,
    CreateSellerComponent,
    NavbarComponent,
    GameSellersDetailsComponent,
+    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStockService,
    SellerCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 3. Now we are going to create in folder `app/services` the file `game-router-activator.service.ts`

```typescript
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GameStockService } from './gameStock.service';

@Injectable()
export class GameRouterActivatorService implements CanActivate {
  constructor(private gameStockService: GameStockService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const gameExists = !!this.gameStockService.getGame(route.params['id']);
    if (!gameExists) {
      this.router.navigate(['/404'])
        .then(() => true);
    }
    return gameExists; // !! ???
  }
}

```

### 4. Now we have to rgister `game-router-activator.service.ts` in `app.module.ts` as provider.

```diff
...
+import { GameRouterActivatorService } from './services/game-router-activator.service';

import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GamesListComponent,
    CreateSellerComponent,
    NavbarComponent,
    GameSellersDetailsComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStockService,
    SellerCategoryService,
+    GameRouterActivatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 5. Now we have to associate this service with the route in `app.routes.ts` and register the new route.

```diff
import { Routes } from '@angular/router';
import { GamesListComponent } from './game/games-list.component';
import { CreateGameComponent } from './game/create-game.component';
import { CreateSellerComponent } from './game/seller-details/create-seller.component';
import { GameSellersComponent } from './game/seller-details/game-sellers-details.component';
+import { Error404Component } from './errors/404.component';
+import { GameRouterActivatorService } from './services/game-router-activator.service';

export const appRoutes: Routes = [
  { path: 'games/new', component: CreateGameComponent },
  { path: 'games', component: GamesListComponent },
-  { path: 'games/:id', component: GameSellersComponent },
+  { path: 'games/:id', component: GameSellersComponent, canActivate: [GameRouterActivatorService] },
  { path: 'games/seller/new', component: CreateSellerComponent },
+  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];

``` 
* All of this to watch if we can navigate to a page depending on the navigation params, but we can do that the user does not leave a page until some kind of action has been made.

### 6. Let's modify `create-game.component.*`, to achieve this goal.

```diff typescript
import { Component, Output } from '@angular/core';
import { GameStockService } from '../services/gameStock.service';
import { Game } from '../models/game.model';
+import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
+  isDirty = true; // Value to use on guard
-  constructor(private gameStockService: GameStockService) {}
+constructor(private gameStockService: GameStockService, private router: Router) {}

  createGame(formValues: any) {
+    this.isDirty = false;
    const game = this.mapper(formValues);
    this.gameStockService.addGame(game);
+    this.router.navigate(['/games']);
  }

  private mapper(formValues: any): Game {
    return new Game(formValues.name, formValues.daterelease, formValues.imageurl);
  }
+
+  cancel() {
+    this.router.navigate(['/games']);
+  }
}

```

```diff html
....
+    <button class="btn btn-default" (click)="cancel()">Cancel</button>
  </form>
</div>
```

### 7. We are going to avoid that user does not navigate away from CreateCustomerComponent without confirm. Create `checkDirty.service.ts` and place it in `app/services`

```typescript
import { InjectionToken } from '@angular/core';
import { CreateGameComponent } from '../game/create-game/create-game.component';

export let CHECKDIRTY_TOKEN = new InjectionToken('checkDirty');

export function checkDirtyState(component: CreateGameComponent) {
  if (component.isDirty) {
    return window.confirm('You do not saved, do yo really want to cancel?')
  }
  return true;
}

```
### 8. Now we have to register this in `app.module.ts`

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game/seller-details/game-sellers.component';
import { GameSellersDetailsComponent } from './game/seller-details/game-sellers-details.component';
import { CreateGameComponent } from './game/create-game.component';
import { GamesListComponent } from './game/games-list.component';
import { CreateSellerComponent } from './game/seller-details/create-seller.component';
import { NavbarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { GameStockService } from './services/gameStock.service';
import { SellerCategoryService } from './services/sellerCategory.service';
import { GameRouterActivatorService } from './services/game-router-activator.service';
+import { CHECKDIRTY_TOKEN, checkDirtyState } from './services/checkDirty.service';

import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GamesListComponent,
    CreateSellerComponent,
    NavbarComponent,
    GameSellersDetailsComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStockService,
    SellerCategoryService,
    GameRouterActivatorService,
+    {
+      provide: CHECKDIRTY_TOKEN,
+      useValue: checkDirtyState
+    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 9. For last we have to link the route. Open and edit `app.routes.ts`.

```diff
import { Routes } from '@angular/router';
import { GamesListComponent } from './game/games-list.component';
import { CreateGameComponent } from './game/create-game.component';
import { CreateSellerComponent } from './game/seller-details/create-seller.component';
import { GameSellersDetailsComponent } from './game/seller-details/game-sellers-details.component';
import { Error404Component } from './errors/404.component';
import { GameRouterActivatorService } from './services/game-router-activator.service';
+import { CHECKDIRTY_TOKEN } from './services/checkDirty.service';

export const appRoutes: Routes = [
-  { path: 'games/new', component: CreateGameComponent },
+  { path: 'games/new', component: CreateGameComponent, canDeactivate: [CHECKDIRTY_TOKEN] },
  { path: 'games', component: GamesListComponent },
  { path: 'games/:id', component: GameSellersDetailsComponent, canActivate: [GameRouterActivatorService] },
  { path: 'games/seller/new', component: CreateSellerComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];

```
