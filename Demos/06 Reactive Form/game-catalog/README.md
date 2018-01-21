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

## NOTE: In this demo we are going to create a reactive form.
## Steps.

### 1. We start by creating a new folder `src/app/seller`

### 2. We create a new component `create-seller.component.*`

* Open `bash` in `src/app/seller`

```bash
ng generate component create-seller
```
* Remove `create-seller.component.css`
* Remove `create-seller.component.spec.ts`

```html
<div class="row">
  <div class="col">
    <h3>Create Seller</h3>
  </div>
</div>
<div class="row">
  <div class="col-6">
    <form>
      <div class="form-group">
        <label for="sellercategory">Category</label>
        <select class="form-control">
          <option value="">select category...</option>
        </select>
      </div>
      <div class="form-group">
        <label for="tax">Tax</label>
        <select class="form-control">
          <option value="">select tax...</option>
        </select>
      </div>
      <div class="form-group">
        <label for="remarks">Remarks:</label>
        <textarea rows=3 class="form-control" placeholder="remarks..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="submit" class="btn btn-default">Cancel</button>
    </form>
  </div>
</div>

```

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles:[`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})
export class CreateSellerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```
### 3. We create a new route for component, in `app.routes.ts`

```diff
+import { CreateSellerComponent } from './seller/create-seller/create-seller.component';

export const appRoutes: Routes = [
  { path: 'games', component: GamesListComponent },
  { path: 'games/new', component: CreateGameComponent },
+  { path: 'seller/new', component: CreateSellerComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];
```
* Time to try to navigate to it.

### 4. We are going to create a reactive form, in order to get this working, we are going to register a new import in our module.

```diff
-import { FormsModule } from '@angular/forms';
+import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    .....
    imports: [
        ....
+        ReactiveFormModules
        ....
    ]
    ....
})
```

### 5. We are going to do a rich form, we are going to introduce some new models
```typescript tax.model
export interface ITax {
  id: number;
  name: string;
  amount: number;
}
```


```typescript sellerCategory.model
import { ITax } from './tax.model';

export interface ISellerCategory {
  id: number;
  name: string;
  taxes: Array<ITax>;
}
```
### 6. No we are going to create a service that provides data related with `sellerCategory.model` and `tax.model`. In folder `services`, we create `sellerCategory.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { ISellerCategory } from '../models/sellerCategory.model';

const SELLERCATEGORIES: ISellerCategory[] = [
  {
    id: 1,
    name: 'National',
    taxes: [
      {
        id: 1,
        name: 'I.V.A.',
        amount: 0.21,
      },
      {
        id: 3,
        name: 'exempt',
        amount: 0,
      }
    ],
  },
  {
    id: 2,
    name: 'European',
    taxes: [
      {
        id: 2,
        name: 'european external tariff',
        amount: 0.17,
      },
      {
        id: 3,
        name: 'exempt',
        amount: 0,
      }
    ]
  },
  {
    id: 3,
    name: 'Foreign',
    taxes: [
      {
        id: 4,
        name: 'foreign external tariff',
        amount: 0.47,
      },
      {
        id: 5,
        name: 'special tariff',
        amount: 0.26,
      }
    ]
  }
];

@Injectable()
export class SellerCategoryService {
  getSellerCategories() {
    return SELLERCATEGORIES;
  }
}
```

### 7. Now we have to register our new service, in `app.module.ts`.

```diff
...
+import { SellerCategoryService } from './services/sellerCategory.service';

import { appRoutes } from './app.routes';


@NgModule({
  ...
  providers: [
    GameStockService,
+    SellerCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 8. Let's load the seller categories options dinamically in our component `create-seller.component.*`. In order to do that we have to inject the service in our component.

```html
....
<div class="form-group">
    <label for="sellercategory">Category</label>
    <select class="form-control">
        <option value="">select category...</option>
        <option [value]="categoryLookup.id" *ngFor="let categoryLookup of categoryLookupCollection">
          {{ categoryLookup.name }}
        </option>
    </select>
</div>
....
```

```diff typescript
import { Component, OnInit } from '@angular/core';
+import { SellerCategoryService } from '../../services/sellerCategory.service';
+import { ISellerCategory } from '../../models/sellerCategory.model';

@Component({
    selector: 'app-create-seller',
    templateUrl: './create-seller.component.html',
    styles:[`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})

export class CreateSellerComponent implements OnInit {
+   categoryLookupCollection: Array<any>;
+
+   constructor(private sellerCategoryService: SellerCategoryService) { }    
+    
    ngOnInit() {
+      const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
+      this.categoryLookupCollection = categories
+        .map(
+          (category) => ({
+            id: category.id,
+            name: category.name,
+          })
+        );
    }
}
```
* Test now that it's working.

### 9. Now lets register our form as reactive form, for that purpose, we have to use [formGroup]="newContractForm" on our form node.

```diff html
<div class="row">
  <div class="col">
    <h3>Create Seller</h3>
  </div>
</div>
<div class="col-6">
-  <form>
+  <form [formGroup]="newSellerForm" (ngSubmit)="saveSeller(newSellerForm.value)">
      ....
  </form>
</div>
```

```diff typescript
....
+saveSeller(formValues) {
+  console.log(formValues);
+}
....
```

### 10. We are going to have two combo selections, one depending on the other one (for a particular category we can only choose particular taxes). So we have to get notifed when the category value get changed.

```diff html
<div class="form-group">
    <label for="sellercategory">Category</label>
-    <select class="form-control">
+    <select formControlName="category" class="form-control" (change)="onChangeCategory($event.target.value)">
        <option value="">select category...</option>
        <option [value]="categoryLookup.id" *ngFor="let categoryLookup of categoryLookupCollection">
          {{ categoryLookup.name }}
        </option>
    </select>
</div>
```

### 11. In `create-seller.component.ts`, we have to register variables for form and the control (9, 10) `newSellerForm` and `category`.

```diff typescript
...
+import { FormGroup, FormControl, Validators } from '@angular/forms';
...
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
+  newSellerForm: FormGroup;
+  category: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  ngOnInit() {
+    this.category = new FormControl('', Validators.required);
+    this.newSellerForm = new FormGroup({
+      category: this.category,
+    });
    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
    this.categoryLookupCollection = categories
      .map(
        (category) => ({
          id: category.id,
          name: category.name,
        })
      );
  }
}
``` 
### 12. Register now the tax field, in `create-seller.component.html`.

```diff html
<div class="form-group">
    <label for="tax">Tax</label>
-    <select class="form-control">
+    <select formControlName="tax" class="form-control">
        <option value="">select tax...</option>
+        <option [value]="taxLookup.id" *ngFor="let taxLookup of taxLookupCollection">
+          {{ taxLookup.name }}
+        </option>
    </select>
</div>
```

### 13. Modify `create-seller.component.ts`, to reflect tax changes and category changes.

```diff typescript
...
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
+  taxesByCategory: Array<any>;
+  taxLookupCollection: Array<any> = []; // TODO: Create Lookup entity.
  newSellerForm: FormGroup;
  category: FormControl;
+ tax: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }
+
+  onChangeCategory(value) {
+    this.taxLookupCollection = this.taxesByCategory
+      .filter((tax) => tax.categoryId === +value)
+      .map(
+        (t) => ({
+          id: t.id,
+          name: t.name
+        })
+      );
+    this.tax.setValue('');
+    this.tax.enable();
+  }

  ngOnInit() {
    this.category = new FormControl('', Validators.required);
+    this.tax = new FormControl('', Validators.required);
    this.newSellerForm = new FormGroup({
      category: this.category,
+      tax: this.tax,
    });
+    this.tax.disable();
    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
    this.categoryLookupCollection = categories
      .map(
        (category) => ({
          id: category.id,
          name: category.name,
        })
      );
+
+    let taxesNormalized: Array<any> = [];
+    categories.forEach((category) => {
+      const taxesByCategoryTemp = category.taxes
+        .map((tax) => ({
+          categoryId: category.id,
+          id: tax.id,
+          name: tax.name
+        }));
+      taxesNormalized = taxesNormalized.concat(taxesByCategoryTemp);
+    });
+    this.taxesByCategory = taxesNormalized;
  }
}
```
* NOTE: tax field depends on category value, so this field will be disabled until teh user selects a value on category.

### 14. Do not forgive to add our blocks on HTML `create-seller.component.html` to show errors.  

```diff html
....
<div class="form-group">
    <label for="sellercategory">Category</label>
+    <em *ngIf="category.invalid && category.dirty" [ngClass]="{ 'error': category.invalid && category.dirty }" class="float-right">
+      Required
+    </em>
    <select formControlName="category" class="form-control" (change)="onChangeCategory($event.target.value)">
        <option value="">select category...</option>
        <option [value]="categoryLookup.id" *ngFor="let categoryLookup of categoryLookupCollection">
          {{ categoryLookup.name }}
        </option>
    </select>
</div>
<div class="form-group">
    <label for="tax">Tax</label>
+    <em *ngIf="tax.invalid && tax.dirty" [ngClass]="{ 'error': tax.invalid && tax.dirty }" class="float-right">
+      Required
+    </em>
    <select formControlName="tax" class="form-control">
        <option value="">select tax...</option>
        <option [value]="taxLookup.id" *ngFor="let taxLookup of taxLookupCollection">
          {{ taxLookup.name }}
        </option>
    </select>
</div>
```

### 15. Lets add now custom validations to our reactive form, when we create a FormControl we can pass multiple validations to the the same field, using an array, or just pass a function with the custom validation that we have created

* Add this HTML, to `create-seller.component.html`, place it before remarks.

```diff html
...
+<div class="form-group">
+  <label for="name">Name:</label>
+  <input type="text" formControlName="name" class="form-control">
+</div>
....
```
* Add this code out of the class CreateSellerComponent on `create-seller.component.ts`
```diff typescript
+const nameValid = (control: FormControl): { [key: string]: any } => {
+  const firstLetter = control.value.toString()[0];
+  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
+    { 'nameValid' : 'invalid name' } : null;
+};
```

### 16. Now let's make work the custom validation created

```diff html
...
<div class="form-group">
  <label for="name">Name:</label>
+  <em *ngIf="name.invalid && name.dirty && name?.errors.required">Required</em>
+  <em *ngIf="name.invalid && name.dirty && name?.errors.nameValid">Not start by capital letter</em>
  <input type="text" formControlName="name" class="form-control">
</div>
...
```
```diff typescript
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any> = []; // TODO: Create Lookup entity.
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
+  name: FormControl;

......
  ngOnInit() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
+    this.name = new FormControl('', [ Validators.required, nameValid]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
+     name: this.name
    });
    this.tax.disable();
    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
    this.categoryLookupCollection = categories
      .map(
        (category) => ({
          id: category.id,
          name: category.name,
        })
      );

    let taxesByCategory: Array<any> = [];
    categories.forEach((category) => {
      const taxesByCategoryTemp = category.taxes.map((tax) => ({
        categoryId: category.id,
        id: tax.id,
        name: tax.name
      }));
      taxesByCategory = taxesByCategory.concat(taxesByCategoryTemp);
    });
    this.taxesByCategory = taxesByCategory;
  }
}
```
* TODO: Do the same with restricted words.
