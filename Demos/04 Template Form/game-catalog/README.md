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

## NOTE: In this demo we are going to create a game and get inserted in our list of games. This will be achive by our first (templated) form.

## Steps.
### 1. First we have to add the related angular module

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
+import { FormsModule } from '@angular/forms';

import { GameStockService } from './services/gameStock.service';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game/game-sellers/game-sellers.component';
import { CreateGameComponent } from './game/create-game/create-game.component';


@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
+    FormsModule
  ],
  providers: [
    GameStockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 2. Let's create the `create-game.component.*`, inside game folder.

* Open `bash` in `src/app/game`
```bash
ng generate component create-game
```
* Remove `create-game.component.css`
* Remove `create-game.component.spec.ts`

```html
<div>
  <h3>Create Game</h3>
  <form #createGameForm="ngForm" autocomplete="off" novalidate>
    <div class="form-group">
      <label for="name">
        Game Name:
      </label>
      <input type="text"
          name="name"
          (ngModel)="name"
          class="form-control"
          placeholder="Game Name"
      />
    </div>
    <div class="form-group">
      <label for="imageurl">
        Image URL:
      </label>
      <input type="text"
        name="imageurl"
        (ngModel)="imageurl"
        class="form-control"
        placeholder="Image URL"
      />
    </div>
    <div class="form-group">
      <label for="daterelease">
        Date Release:
      </label>
      <input type="date"
        name="daterelease"
        (ngModel)="daterelease"
        class="form-control"
        placeholder="Date Release"
        min="1980-01-01"
      />
    </div>
  </form>
</div>

```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {

}
```
### 3. Now let's add some validations to this form. `name` and `datarealase` are going to be require fields.

```diff
....
<label for="name">
  Game Name:
</label>
+<em *ngIf="createGameForm.controls.name?.invalid &&
+  (createGameForm.controls.name?.touched)" class="float-right">
+  Required
+</em>
<input type="text"
    name="name"
    (ngModel)="name"
    class="form-control"
    placeholder="Game Name"
+    required
/>
....

<div class="form-group">
  <label for="daterelease">
    Date Release:
  </label>
+  <em *ngIf="createGameForm.controls.daterelease?.invalid &&
+    (createGameForm.controls.daterelease?.touched)" class="float-right"
+  >
+    Required
+  </em>
  <input type="date"
    name="daterelease"
    (ngModel)="daterelease"
    class="form-control"
    placeholder="Date Release"
    min="1980-01-01"
+    required
  />
</div>

```

### 4. At this point let's handle the submitted form in our component.

```diff
<div>
  <h3>Create Game</h3>
  <form #createGameForm="ngForm" autocomplete="off" novalidate
+    (ngSubmit)="createGame(createGameForm.value)">
    <div class="form-group">
      <label for="name">
        Game Name:
      </label>
```
```diff
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-game',
-  templateUrl: '',
+  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
+  createGame(formValues: any) {
+    console.log(formValues);
+  }
}
```

* To watch the results we have to display this form to achieve that,  let's add this component to the main one `app.component.html`.

```diff
<div class="container">
  <h1>
    {{title}}
  </h1>
+  <app-create-game></app-create-game>
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
  <app-game-sellers [gameName]="selectedGameInfo" [sellers]="sellers"></app-game-sellers>
</div>

```
* Show the results changing the control focus, on each control (name and daterelease).

### 5. Now we are going to make the imageUrl required and with an url diretion

```diff
...
<div class="form-group">
  <label for="imageurl">
    Image URL:
  </label>
+  <em *ngIf="createGameForm.controls.imageurl?.invalid &&
+    createGameForm.controls.imageurl?.errors.required &&
+    (createGameForm.controls.imageurl?.touched)" class="float-right">
+    Required
+  </em>
+  <em *ngIf="createGameForm.controls.imageurl?.invalid &&
+    createGameForm.controls.imageurl?.errors.pattern &&
+    (createGameForm.controls.imageurl?.touched)" class="float-right">
+    Not valid URL
+  </em>
  <input type="text"
    name="imageurl"
    (ngModel)="imageurl"
    class="form-control"
    placeholder="Image Url"
+    required
+    pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
  />
</div>
...
```
* Show the results changing the control focus, on each control, and typing invalid url.

### 6. Now let's add a button to submit form.

```diff
....
+  <button type="submit" [disabled]="createGameForm.invalid" class="btn btn-primary">Create</button>
</form>
```
* Open console to show the results on console.

### 7. Now we want to give some extra information to our user, when hovers the submit button. We want the errors get displayed.

```diff
+<span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
    <button type="submit" [disabled]="createGameForm.invalid" class="btn btn-primary">Create</button>
+</span>
```
* Ask why the span.

```diff
<div class="form-group">
  <label for="name">
    Game Name:
  </label>
  <em *ngIf="createGameForm.controls.name?.invalid &&
-    (createGameForm.controls.name?.touched)" class="float-right">
+    (createGameForm.controls.name?.touched || mouseoverLogin)" class="float-right">
    Required
  </em>
  <input type="text"
      name="name"
      (ngModel)="name"
      class="form-control"
      placeholder="Game Name"
      required
  />
</div>
....

<div class="form-group">
  <label for="imageurl">
    Image URL:
  </label>
  <em *ngIf="createGameForm.controls.imageurl?.invalid &&
    createGameForm.controls.imageurl?.errors.required &&
-    (createGameForm.controls.imageurl?.touched)" class="float-right">
+    (createGameForm.controls.imageurl?.touched || mouseoverLogin)" class="float-right">
    Required
  </em>
  <em *ngIf="createGameForm.controls.imageurl?.invalid &&
    createGameForm.controls.imageurl?.errors.pattern &&
-    (createGameForm.controls.imageurl?.touched)" class="float-right">
+    (createGameForm.controls.imageurl?.touched || mouseoverLogin)" class="float-right">
    Not valid URL
  </em>
  <input type="text"
    name="imageurl"
    (ngModel)="imageurl"
    class="form-control"
    placeholder="Image Url"
    required
    pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
  />
</div>
....

<div class="form-group">
  <label for="daterelease">
    Date Release:
  </label>
  <em *ngIf="createGameForm.controls.daterelease?.invalid &&
-    (createGameForm.controls.daterelease?.touched)" class="float-right"
+    (createGameForm.controls.daterelease?.touched || mouseoverLogin)" class="float-right"
  >
    Required
  </em>
  <input type="date"
    name="daterelease"
    (ngModel)="daterelease"
    class="form-control"
    placeholder="Date Release"
    min="1980-01-01"
    required
  />
</div>
```

### 8. Now with everything on place, let's modify our `create-game.component` to send a custom event when we submit the form.

```diff
-import { Component } from '@angular/core';
+import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
+  @Output() createGameEvent: EventEmitter<any> = new EventEmitter<any>();
  createGame(formValues: any) {
-    console.log(formValues);
+    this.createGameEvent.emit(formValues);
  }
}
```
### 9. Now we have to modify `app.component.*` to handle the event. 

* NOTE: We have to modify `GameStockService` with a new method.
``` diff gameStock.service.ts
@Injectable()
export class GameStockService {
  getGames(): Game[] {
    return GAMES;
  }

  getGame(name: string): Game {
    return GAMES.find((game) => game.name === name);
  }

  getGameSellers(name: string): ISeller[] {
    return this.getGame(name).sellers;
  }
+
+  addGame(game: Game): void {
+    GAMES.push(game);
+  }
}
```


```diff html
<div class="container">
  <h1>
    {{title}}
  </h1>
-  <app-create-game></app-create-game>
+  <app-create-game (createGameEvent)="createGameEventHandler($event)"></app-create-game>
  <div class="row">
    <button class="btn btn-primary btn-sm float-right" (click)="show=!show">Show games!</button>
  </div>
  <div class="games-container" *ngIf="show">
    <div *ngFor="let game of games">
      <app-game-summary (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
    </div>
    <app-game-sellers [gameName]="selectedGameInfo" [sellers]="sellers"></app-game-sellers>
  </div>
</div>
```

```diff typescript
import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.model';
import { ISeller } from './models/seller.model';
import { GameStockService } from './services/gameStock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Interactions Demo';
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];
  show = true;

  constructor(private gameStockService: GameStockService) {
  }

  gameChangeHandler($event: any) {
    const sellers = this.gameStockService.getGameSellers($event);
    const selectedGame = this.gameStockService.getGame($event);
    this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;
    this.sellers = (sellers && sellers.length > 0) ? sellers : [];
  }

+  createGameEventHandler($event: any) {
+    const game = this.mapper($event);
+    this.gameStockService.addGame(game);
+    this.loadGames();
+  }

+  private mapper(formValues: any): Game {
+    return new Game(formValues.name, formValues.daterelease, formValues.imageurl);
+  }
+
  ngOnInit() {
-    this.games = this.gameStockService.getGames();
+    this.loadGames();
  }
+
+  private loadGames() {
+    this.games = this.gameStockService.getGames();
+  }
}
```
