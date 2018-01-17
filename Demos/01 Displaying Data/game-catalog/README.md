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

### 1.  Create a new folder call it models `src/app/models/game.model.ts`. Create file `game.model.ts`.

```diff
+export class Game {
+  name: string;
+  dateRelease: Date;
+  imageUrl?: string;
+
+  constructor(name?: string, dateRelease?: string, imageUrl?: string) {
+    this.name = name;
+    this.dateRelease = new Date(dateRelease);
+    this.imageUrl = imageUrl;
+  }
+
+  getYearsFromRelease(): number {
+    const millisecondsDiff = this.getMillisecondsDiff(this.dateRelease.getTime());
+    return this.convertToYears(
+      new Date(millisecondsDiff)
+    );
+  }
+
+  private getMillisecondsDiff = (milliseconds: number): number => Date.now() - milliseconds;
+
+  private convertToYears = (releaseDate: Date): number => Math.abs(releaseDate.getUTCFullYear() - 1970);
+}
```

### 2.Now let's modify the `app.component.ts` so can consume this new class. Create new properties and initialize them in constructor. 

```diff
import { Component, OnInit } from '@angular/core';
+import { Game } from './models/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
-  title = 'app works!';
+  title = 'Displaying Data Demo';
+  private games: Game[];
+  game: Game;

+  constructor() {
+    this.games = [
+      new Game('Super Mario Bros', '13 September 1985'),
+      new Game('Legend of Zelda', '21 February 1986'),
+      new Game('Sonic', '26 June 1981'),
+    ];
+  }

  ngOnInit() {
-    this.title = 'app works';
  }
}
```

### 3.  For last we are going to initialize our game property on ngOnInit

```diff
....
ngOnInit() {
+  this.game = this.games[0];
}
....
```
### 4. For this demo we are going to install, bootstrap.
* Open console and type with root folder `game-catalog`:

```code
$npm install bootstrap@4.0.0-alpha.6 --save
```

* Then on `styles.css` we can type

```diff
+ @import '../node_modules/bootstrap/dist/css/bootstrap.css';
+
+body {
+  padding: 2em;
+}
```

### 5. Now we are going to transform `app.component.html`, to show the game.

```diff
<h1>
  {{title}}
</h1>

+<div class="row">
+  <div class="col">
+    <label>Name:</label>
+    <span>{{game.name}}</span>
+  </div>
+  <div class="col">
+    <label>Release Date:</label>
+    <span>{{game.getYearsFromRelease()}}</span>
+  </div>
+</div>

```
