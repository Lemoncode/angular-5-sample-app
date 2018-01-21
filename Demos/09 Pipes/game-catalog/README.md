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

## NOTE: In this demo we are going to create pipes in Angular 4.
## Steps.

### 1. In this demo we are going top use external icons. We are going to install and use `font-awesome`.

```bash
npm install --save font-awesome
```
* Edit `src/styles` as follows

```diff
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
+@import '../node_modules/font-awesome/css/font-awesome.css';

body {
  padding: 2em;
}

```

### 2. Let's create a new component under `src/app/seller`, `seller-details.component.*`

* Open `bash` in `src/app/seller`

```bash
$ng generate component seller-details
```
* Remove `*.css`
* Remove `*.spec.ts`

```html
<div class="card card-block bg-faded">
  <h4>{{seller.name}}</h4>
  <span>Cantidad disponible: {{seller.amount}}</span>
  <span>Precio unitario: {{seller.price}}</span>
</div>
```

```typescript
import { Component, Input } from '@angular/core';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html'
})
export class SellerDetailsComponent {
  @Input() seller: ISeller;
}
```

### 3. Let's change `game-sellers.comnponent.html`, to use `app-seller-details`

```diff
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
-        <span>{{seller.name}}</span>
+        <app-seller-details [seller]="seller"></app-seller-details>
      </div>
    </div>
    <app-create-seller *ngIf="addMode"></app-create-seller>
  </div>
</div>

```

* Run the application.

### 4. To watch the value displayed with the currency, we can use an Angular built in pipe.

```diff
<div class="card card-block bg-faded">
  <h4>{{seller.name}}</h4>
  <span>Cantidad disponible: {{seller.amount}}</span>
-  <span>Precio unitario: {{seller.price}}</span>
+  <span>Precio unitario: {{seller.price | currency:'EUR':true}}</span>
</div>
```

### 5. Now we are going to create a custom pipe that will display a check icon if a game is available, and cross if not.

* We create a new folder call `app/pipes`. Inside we can place now `available.pipe.ts`.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'available' })
export class AvailablePipe implements PipeTransform {
  transform(value: number): string {
    return (value > 0) ?
      'glyphicon glyphicon-ok' :
      'glyphicon glyphicon-remove';
  }
}

```
### 6. Let's register this custom pipe in `app.module.ts`.

```diff
....
+import { AvailablePipe } from './pipes/available.pipe';

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
    Error404Component,
+    AvailablePipe
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
    {
      provide: CHECKDIRTY_TOKEN,
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 7. For last we use it inside of `seller-details.comnponent.html`

```diff
<div class="well">
  <h4>{{seller.name}}</h4>
  <span>Cantidad disponible: {{seller.amount}}</span>
  <span>Precio unitario: {{seller.price | currency:'EUR':true}}</span>
+  <i [class]="seller.amount | available" aria-hidden="true"></i>
</div>

```
