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

### 1.  Create a new folder call it game `src/app/game`.
* This folder will contain a component that will be the summary for one game.
* Let's create `game-summary.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html'
})
export class GameSummaryComponent {
  @Input() game: Game;
}

```
* Let's create as well the view for this component.

```html
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

```

### 2. In order to use this new component, we have to register in our module (the app module). 

* For that purpose we have to import it. Open `app.module.ts`

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
+import { GameSummaryComponent } from './game/game-summary.component';
...
```

* And then we have to declare on declarations as well.

```diff
@NgModule({
  declarations: [
    AppComponent,
+    GameSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

### 3. Now let's use our new component in `app.component.ts`

* First we are going to remove the initialization from constructor. This is a bad practice.

```diff
import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
-  title = 'Displaying Data Demo';
+  title = 'Displaying Collections Demo'; 
-  private games: Game[];
-  game: Game;
+  games: Game[];

  constructor() {
-    this.games = [
-      new Game(
-        'Super Mario Bros',
-        '13 September 1985',
-      ),
-      new Game(
-        'Legend of Zelda',
-        '21 February 1986',
-      ),
-      new Game(
-        'Sonic',
-        '26 June 1981',
-      ),
-    ];
  }

  ngOnInit() {
+    this.games = [
+      new Game(
+        'Super Mario Bros',
+        '13 September 1985',
+        // tslint:disable-next-line:max-line-length
+        'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
+      ),
+      new Game(
+        'Legend of Zelda',
+        '21 February 1986',
+        // tslint:disable-next-line:max-line-length
+        'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
+      ),
+      new Game(
+        'Sonic',
+        '26 June 1981',
+        'https://i.ytimg.com/vi/dfFd7Bu6xnc/hqdefault.jpg',
+      ),
+    ];
  }
}

```
```typescript
this.games = [
      new Game(
        'Super Mario Bros',
        '13 September 1985',
        // tslint:disable-next-line:max-line-length
        'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
      ),
      new Game(
        'Legend of Zelda',
        '21 February 1986',
        // tslint:disable-next-line:max-line-length
        'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
      ),
      new Game(
        'Sonic',
        '26 June 1981',
        'https://i.ytimg.com/vi/dfFd7Bu6xnc/hqdefault.jpg',
      ),
    ];
```

### 4. For last we have to change the `app.component.html`, so we can use, `app-game-summary` 

```diff
<h1>
  {{title}}
</h1>

-<div class="row">
-  <div class="col">
-    <label>Name:</label>
-    <span>{{game.name}}</span>
-  </div>
-  <div class="col">
-    <label>Years from release:</label>
-    <span>{{game.getYearsFromRelease()}}</span>
-  </div>
-</div>

+<div class="container">
+  <div *ngFor="let game of games">
+      <app-game-summary [game]=game></app-game-summary>
+  </div>
+</div>
```
