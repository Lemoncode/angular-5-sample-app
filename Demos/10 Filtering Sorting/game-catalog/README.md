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

## NOTE: In this demo we are going to filtering and sorting the displayed data on `game-sellers.componet.*`
## Steps.

### 1. First we have to make some changes on `game-sellers.componet.*`

```diff html
<h2>Game Details</h2>
<div class="row">
  <div class="col-2">
    <h3>Sellers</h3>
  </div>
  <div class="col-8">
-    <!-- TODO: Add options for filtering -->
+      <div class="btn-group btn-group-sm">
+        <button class="btn btn-default" [class.active]="sortBy==='asc'" (click)="sortBy='asc'">
+          Precio mayor
+        </button>
+        <button class="btn btn-default" [class.active]="sortBy==='desc'" (click)="sortBy='desc'">
+          Precio menor
+        </button>
+      </div>
+      <div class="btn-group btn-group-sm">
+        <button class="btn btn-default" [class.active]="filterBy==='all'" (click)="filterByBy='all'">
+          Todos
+        </button>
+        <button class="btn btn-default" [class.active]="filterBy==='available'" (click)="filterBy='available'">
+          Disponibles
+        </button>
+      </div>
  </div>
  <div class="col-2">
      <a (click)="toggleAddSeller()">Add seller</a>
  </div>
</div>
<div class="row">
  <div class="col" *ngIf="!addMode">
    <h2>{{gameName}}</h2>
    <div *ngFor="let seller of sellers">
      <app-seller-details [seller]="seller"></app-seller-details>
    </div>
  </div>
</div>
<app-create-seller *ngIf="addMode"></app-create-seller>


```
```diff typescript
...
export class GameSellersComponent implements OnInit {
  gameName: string;
  sellers: ISeller[];
  addMode = false;
+  filterBy = 'all';
+  sortBy = 'asc';
  constructor(private route: ActivatedRoute, private gameStockService: GameStockService) { }

  ...
}

```

### 2. Now we are going to create a new componente under `src/app/seller`, `seller-list.component.*`

* Open `bash` in `src/app/seller`

```bash
$ng generate component seller-list
```
* Remove `*.css`
* Remove `*.spec.ts` 

```html
<div *ngFor="let seller of sellers">
  <app-seller-details [seller]="seller"></app-seller-details>
</div>
```

```typescript
import { Component, Input } from '@angular/core';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent {
  @Input() sellers: ISeller[];
}

```
### 3. Now we have to update `game-sellers.component.html`, in order to use this new component.

```diff html
<h2>Game Details</h2>
<div class="row">
  <div class="col-2">
    <h3>Sellers</h3>
  </div>
  <div class="col-8">
    <div class="btn-group btn-group-sm">
      <button class="btn btn-default" [class.active]="sortBy==='asc'" (click)="sortBy='asc'">
        Precio mayor
      </button>
      <button class="btn btn-default" [class.active]="sortBy==='desc'" (click)="sortBy='desc'">
        Precio menor
      </button>
    </div>
    <div class="btn-group btn-group-sm">
      <button class="btn btn-default" [class.active]="filterBy==='all'" (click)="filterByBy='all'">
        Todos
      </button>
      <button class="btn btn-default" [class.active]="filterBy==='available'" (click)="filterBy='available'">
        Disponibles
      </button>
    </div>
  </div>
  <div class="col-2">
    <a (click)="toggleAddSeller()">Add seller</a>
  </div>
</div>
<div class="row">
  <div class="col" *ngIf="!addMode">
    <h2>{{gameName}}</h2>
+    <app-seller-list [sellers]="sellers"></app-seller-list>
-    <div *ngFor="let seller of sellers">
-      <app-seller-details [seller]="seller"></app-seller-details>
-    </div>
  </div>
</div>
<app-create-seller *ngIf="addMode"></app-create-seller>


```
* Check that everything it's working.

### 4. Now we have to pass the params to `seller-list` so it can be filter and sorting by them.

`game-sellers.component.html`
```diff html
....
<div *ngIf="!addMode">
  <h2>{{gameName}}</h2>
-  <app-seller-list [sellers]="sellers"></app-seller-list>
+ <app-seller-list [sortBy]="sortBy" [filterBy]="filterBy" [sellers]="sellers"></app-seller-list>
</div>
<app-create-seller *ngIf="addMode"></app-create-seller>
....
```

`seller-list.component.ts`
```diff typescript
-import { Component, Input } from '@angular/core';
+import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
+export class SellerListComponent implements OnChanges {
-export class SellerListComponent {
  @Input() sellers: ISeller[];
+  @Input() filterBy: string;
+  @Input() sortBy: string;
+  visibleSellers: ISeller[];
+
+  ngOnChanges(changes: SimpleChanges): void {
+  }
}
```
### 5. Now let's introduce the changes on `seller-list.component.*`

```diff html
-<div *ngFor="let seller of sellers">
+<div *ngFor="let seller of visibleSellers">
  <app-seller-details [seller]="seller"></app-seller-details>
</div>
```
```diff typescript
import { Component, Input, OnChanges } from '@angular/core';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html',
})
export class GameSellersComponent implements OnChanges {
  @Input() sellers: ISeller[];
  @Input() gameName: string;
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSellers: ISeller[];

+  ngOnChanges(changes: SimpleChanges): void {
+    if (changes['filterBy']) {
+      this.visibleSellers = this.filterSellers(changes['filterBy'].currentValue);
+    }
+    if (changes['sortBy']) {
+      this.sortSellers(changes['sortBy'].currentValue);
+    }
+  }
+
+  private filterSellers = (filter: string): ISeller[] => (
+    this.sellers.filter(
+      (s) => filter === 'all' || s.amount > 0
+    )
+  );
+
+  private sortSellers = (sortBy: string): void => {
+    this.visibleSellers.sort(this.sortSellersReaction[sortBy]);
+  };
+
+  private sortSellersReaction = {
+    ['asc']: (current: ISeller, after: ISeller) => after.price - current.price,
+    ['desc']: (current: ISeller, after: ISeller) => current.price - after.price
+  };
}
```
