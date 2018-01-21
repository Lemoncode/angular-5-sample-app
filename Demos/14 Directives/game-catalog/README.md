# DisplayingData

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

## Note

Starts from previous demo.

## Steps

### 1. Create a new file on `src/app/common` folder, `messageToastr.drirective.ts`.

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[message-toastr]' 
})
export class MessageToastrDirective {
    private element: HTMLElement;

    constructor(ref: ElementRef) {
        this.element = ref.nativeElement;
        console.log(this.element);
    }
}
```

### 2. Lets add the directive to the module.
```diff
+import { MessageToastrDirective } from './common/message-toastr.directive';
....

@NgModule({
  declarations: [
    .... 
+    MessageToastrDirective
  ],
  ....
})
```

### 3. Now lets check that our directive it is wiring up to the html node where is placed. Open `game-list.component.html`, and modify as follows:

```diff
<div class="container">
  <h1>
    {{title}}
  </h1>
  <div class="games-container">
    <div *ngFor="let game of games" [routerLink]="['/games', game.name]">
-      <app-game-summary (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
+      <app-game-summary appMessageToastr (gameChange)="gameChangeHandler($event)" [game]=game></app-game-summary>
    </div>
  </div>
</div>

```

* Open console on browser and watch results.

### 4. Now we are going to handle the click on the node element, where the directive is placed.

```diff
-import { Directive, ElementRef } from '@angular/core';
+import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appMessageToastr]'
})
-export class MessageToastrDirective {
+export class MessageToastrDirective implements OnInit {  
  private element: HTMLElement;

  constructor(ref: ElementRef) {
    this.element = ref.nativeElement;
-    console.log(this.element);
  }
+
+  ngOnInit(): void {
+    this.element.addEventListener('click', (evt) => {
+      console.log(evt);
+    });
+  }
}
```
### 5. Now lets add a new service that will handle show a message to the user when the directive responses to the click event. Create the following code `src/app/common/toastr.service.ts`

```typescript
import { InjectionToken } from '@angular/core';

export const TOASTR_TOKEN = new InjectionToken<string>('toastr');
declare let toastr; // Try with const

export class Toastr {
  success(message: string, title?: string): void {
    if (title) {
      toastr.success(message, title);
    } else {
      toastr.success(message);
    }
  }
  info(message: string, title?: string): void {
    if (title) {
      toastr.info(message, title);
    } else {
      toastr.info(message);
    }
  }
  warning(message: string, title?: string): void {
    if (title) {
      toastr.warning(message, title);
    } else {
      toastr.warning(message);
    }
  }
  error(message: string, title?: string): void {
    if (title) {
      toastr.error(message, title);
    } else {
      toastr.error(message);
    }
  }
}

```

* This is just a wrapper around the toastr library.

### 6. Now we have to bring toastr, so lets import fron npm

```bash
$npm install toastr --save
```

### 7. Before register this toastr as service we have to do a slightly modification in `angular-CLI.json`

```diff
{
  ....
  "apps": [
    {
      ...
      "styles": [
        "styles.css",
+        "../node_modules/toastr/build/toastr.css"
      ],
      "scripts": [
+        "../node_modules/jquery/dist/jquery.js",  
+        "../node_modules/toastr/build/toastr.min.js"
      ],
      ....
    }
  ],
  ....
}
```
* We have to add jquery since toastr has a dependency with it.
* Try out => $ng build
* This way we check out that everything it's ok. 

### 8. Now we have to register in `app.module.ts`

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameStockService } from './services/gameStock.service';
import { SellerCategoryService } from './services/sellerCategory.service';
import { GameRouterActivatorService } from './services/game-router-activator.service';
import { CHECKDIRTY_TOKEN, checkDirtyState } from './services/checkDirty.service';
+import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { CreateSellerComponent } from './seller/create-seller/create-seller.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Error404Component } from './errors/404.component';
import { SellerDetailsComponent } from './seller/seller-details/seller-details.component';
import { AvailablePipe } from './pipes/available.pipe';
import { SellerListComponent } from './seller/seller-list/seller-list.component';
import { CollapsibleCardComponent } from './common/collapsible-card.component';
import { MessageToastrDirective } from './common/message-toastr.directive';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GameListComponent,
    CreateSellerComponent,
    NavbarComponent,
    Error404Component,
    SellerDetailsComponent,
    AvailablePipe,
    SellerListComponent,
    CollapsibleCardComponent,
    MessageToastrDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    GameStockService,
    SellerCategoryService,
    GameRouterActivatorService,
    {
      provide: CHECKDIRTY_TOKEN,
      useValue: checkDirtyState
    },
+    {
+      provide: TOASTR_TOKEN,
+      useClass: Toastr
+    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 9. Now we can use as a service in our derective

```diff
import { Directive, ElementRef, OnInit, Inject } from '@angular/core';
+import { TOASTR_TOKEN, Toastr } from './toastr.service';

@Directive({
  selector: '[appMessageToastr]'
})
export class MessageToastrDirective implements OnInit {
  private element: HTMLElement;

-  constructor(ref: ElementRef) {
+  constructor(ref: ElementRef, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    this.element = ref.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('click', (evt) => {
      console.log(evt);
    });
  }
}
```


### 10. Let's introduce a couple of classes to make easier show the toastr. Open `game-summary.component.html`.

```diff
<div class="card card-block bg-faded" (click)="selectedGame(gameName)">
  <div class="row">
    <input type="text" #gameName [value]=game.name [hidden]=true>
    <div class="col">
      <label>Name:</label>
-      <span>{{game.name}}</span>
+      <span class="gameName">{{game.name}}</span>
    </div>
    <div class="col">
      <label>Years from release:</label>
      <span>{{game.getYearsFromRelease()}}</span>
    </div>
    <div class="col">
      <img class="img-fluid" [src]="game.imageUrl" alt="game image">
    </div>
  </div>
</div>

```

### 11. Now we only have to modify the directive as follows

```diff
import { Directive, ElementRef, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from './toastr.service';

@Directive({
  selector: '[appMessageToastr]'
})
export class MessageToastrDirective implements OnInit {
  private element: HTMLElement;

  constructor(ref: ElementRef, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    this.element = ref.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('click', (evt) => {
+      const rowElement = this.element.querySelector('.row');
+      const gameName = this.element.querySelector('.gameName').innerHTML;
+      this.toastr.success(`Selected game: ${gameName}`);
    });
  }
}
```
