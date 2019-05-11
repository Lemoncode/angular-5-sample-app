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

### 1. Create a new folder `src/app/common`, inside place a new component `collapsible-card.component.ts`

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-card',
    template: `
        <div (click)="toggleContent()"></div>
    `,
    styles: [
        `.pointable { cursor: pointer; }`
    ]
})
export class CollapsibleCardComponent {
    visible = true;

    toggleContent() {
        this.visible = !this.visible;
    }
}
```

* At this point what we got is a div that will toggle its visibility, when the user clicks on it.

### 2. Now we are going to use ng-content directive to fill the component with outer content. 

```diff
@Component({
    selector: 'collapsible-card',
    template: `
-        <div (click)="toggleContent()"></div>
+        <div (click)="toggleContent()" class="card pointable">
+            <h4>
+                <ng-content select="[card-title]"></ng-content>
+            </h4>
+            <ng-content *ngIf="visible" select="[card-body]"></ng-content>
+        </div>
    `,
    styles: [
        `.pointable { cursor: pointer; }`
    ]
})
```

* NOTE: ng-content supports id selectors and class selectors. Here we are using attributes instead.

### 3. Lets register in `app.module.ts` the new component.

```diff
+import { CollapsibleCardComponent } from './common/collapsible-card.component';
....
@NgModule({
  declarations: [
    ....
+    CollapsibleCardComponent
  ],
  ....
})
```

### 4. Now we can use our new component inside our application. Open `seller-details.component.html`, and edit as follows:

```diff
<div class="card card-block bg-faded">
-  <h4>{{seller.name}}</h4>
-  <span>Cantidad disponible: {{seller.amount}}</span>
-  <span>Precio unitario: {{seller.price | currency:'EUR':true}}</span>
-  <i [class]="seller.amount | available" aria-hidden="true"></i>
+  <collapsible-card>
+    <div card-title>
+      {{seller.name}}
+    </div>
+    <div card-body>
+      <span>Cantidad disponible: {{seller.amount}}</span>
+      <span>Precio unitario: {{seller.price | currency:'EUR':true}}</span>
+      <i [class]="seller.amount | available" aria-hidden="true"></i>
+    </div>
+  </collapsible-card>
</div>
```


