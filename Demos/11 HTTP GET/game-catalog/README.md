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

## NOTE: In this demo we are going to load data by using a Web API that will be running on node.
## Steps.

* https://angular.io/guide/http

### 1. Before you can use the `HttpClient`, you need to install the `HttpClientModule` which provides it. This can be done in your application module, and is only necessary once. 

```diff app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
 
// Import HttpClientModule from @angular/common/http
+import {HttpClientModule} from '@angular/common/http';
 
@NgModule({
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
+    HttpClientModule,
  ],
})
....
```


### 2. Open `services/sellerCategory.service.ts`

```diff 
import { Injectable } from '@angular/core';
import { ISellerCategory } from '../models/sellerCategory.model';
+import { Http, Response } from '@angular/http';
+import { Observable } from 'rxjs/Observable';
+import 'rxjs/add/operator/map';
+import 'rxjs/add/operator/catch';

-const SELLERCATEGORIES: ISellerCategory[] = [
-  {
-    id: 1,
-    name: 'National',
-    taxes: [
-      {
-        id: 1,
-        name: 'I.V.A.',
-        amount: 0.21,
-      },
-      {
-        id: 3,
-        name: 'exempt',
-        amount: 0,
-      }
-    ],
-  },
-  {
-    id: 2,
-    name: 'European',
-    taxes: [
-      {
-        id: 2,
-        name: 'european external tariff',
-        amount: 0.17,
-      },
-      {
-        id: 3,
-        name: 'exempt',
-        amount: 0,
-      }
-    ]
-  },
-  {
-    id: 3,
-    name: 'Foreign',
-    taxes: [
-      {
-        id: 4,
-        name: 'foreign external tariff',
-        amount: 0.47,
-      },
-      {
-        id: 5,
-        name: 'special tariff',
-        amount: 0.26,
-      }
-    ]
-  }
-];

import { Injectable } from '@angular/core';
import { ISellerCategory } from '../models/sellerCategory.model';
+import { HttpClient } from '@angular/common/http';
+import { Observable } from 'rxjs/Observable';

+@Injectable()
export class SellerCategoryService {
+  constructor(private http: HttpClient) {}
+ 
-  getSellerCategories() {
+  getSellerCategories(): Observable<ISellerCategory[]> {
-    return SELLERCATEGORIES;
+    return this.http.get<ISellerCategory[]>('http://localhost:8000/api/sellercategories');
+  }
}
```

* Now it's time to run build. What happens is that the build it`s broken right now.

### 3. Let's fix this issue to get build running again. Open `app/game/seller-details/create-seller.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { SellerCategoryService } from '../../services/sellerCategory.service';
import { ISellerCategory } from '../../models/sellerCategory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
+import { Observable } from 'rxjs/Observable';

const nameValid = (control: FormControl): { [key: string]: any } => {
  const firstLetter = control.value.toString()[0];
  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
    { 'nameValid' : 'invalid name' } : null;
};


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles: [`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any> = []; // TODO: Create Lookup entity.
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
  name: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  onChangeCategory(value) {
    this.taxLookupCollection = this.taxesByCategory
      .filter((tax) => tax.categoryId === +value)
      .map(
        (t) => ({
          id: t.id,
          name: t.name
        })
      );
    this.tax.enable();
  }

  saveSeller(formValues) {
    console.log(formValues);
  }

  ngOnInit() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.name = new FormControl('', [ Validators.required, nameValid]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
      name: this.name
    });
    this.tax.disable();
-    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
+    this.sellerCategoryService.getSellerCategories()
+      .subscribe((categories) => {
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
+        }, (err) => console.log(err));
  }
}

```
* Now let's make a new build.

###  4. For last we are going to do a little refactor changing to a private method, where we resolve the lookup entites

```diff
import { Component, OnInit } from '@angular/core';
import { SellerCategoryService } from '../../services/sellerCategory.service';
import { ISellerCategory } from '../../models/sellerCategory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

const nameValid = (control: FormControl): { [key: string]: any } => {
  const firstLetter = control.value.toString()[0];
  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
    { 'nameValid' : 'invalid name' } : null;
};


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles: [`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>; // TODO: Create Lookup entity.
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any> = []; // TODO: Create Lookup entity.
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
  name: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  onChangeCategory(value) {
    this.taxLookupCollection = this.taxesByCategory
      .filter((tax) => tax.categoryId === +value)
      .map(
        (t) => ({
          id: t.id,
          name: t.name
        })
      );
    this.tax.enable();
  }

  saveSeller(formValues) {
    console.log(formValues);
  }

  ngOnInit() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.name = new FormControl('', [ Validators.required, nameValid]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
      name: this.name
    });
    this.tax.disable();
+    this.resolveLookupEntities();
  }

+  private resolveLookupEntities() {
+    this.sellerCategoryService.getSellerCategories()
+    .subscribe((categories) => {
+      this.categoryLookupCollection = categories
+      .map(
+        (category) => ({
+          id: category.id,
+          name: category.name,
+        })
+      );
+
+    let taxesByCategory: Array<any> = [];
+    categories.forEach((category) => {
+      const taxesByCategoryTemp = category.taxes.map((tax) => ({
+        categoryId: category.id,
+        id: tax.id,
+        name: tax.name
+      }));
+      taxesByCategory = taxesByCategory.concat(taxesByCategoryTemp);
+    });
+    this.taxesByCategory = taxesByCategory;
+    }, (err) => console.log(err));
+  }
}

```
