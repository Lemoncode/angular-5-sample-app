# UnderstandingNgmodel

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

## This example starts alone

1. Start by creating a new app with Angular CLI

```bash
$ng new understanding-ngmodel --install-skip
```

* With this command remind that we have the FormsModule already imported.

* Now lets create a new folder call `forms`, inside we will create  app-template-driven-form.component.ts and its template.

* Open `bash` from `app/src/forms`

```bash
$ng generate component template-driven-form
```
* Remove `*.css`
* Remove `*.spec.ts`

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-template-driven.form'
    templateUrl: './app-template-driven-form.component.html'
})

export class TemplateDrivenForm {}
```
```html
<form #templateForm="ngForm" (ngSubmit)="onSubmitTemplateBased(templateForm.value)" novalidate>
    <p>
        <label>First Name:</label>
        <input type="text" (ngModel)="firstName" name="firstName" required>
    </p>
    <p>
        <label>Password:</label>
        <input type="password" (ngModel)="password" name="password" required>
    </p>
    <p>
        <button type="submit" [disabled]="!templateForm.valid">Submit</button>
    </p>
</form>
```
2. In the main template use the  form component

* Import `FormsModule` in `app.module.ts`

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
+import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent
  ],
  imports: [
    BrowserModule,
+    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

app.component.html
```html
<h1>
  {{title}}
</h1>
<app-template-driven-form></app-template-driven-form>
```

3. We comment the code that we have in the app-template-driven-form template

4. Add this markup and comment results

<input [(ngModel)]="username"/>

<p>Hello {{username}}</p>

5. Lets descompose this, the previous code is equivalent to: 

<input [value]="username" (input)="username = $event.target.value" />

<p>Hello {{username}}</p>

Here we can watch that teh updates on our input are leading by the component.

6. We can descompose ngModel banana in a box this way.

<input [ngModel]="username" (ngModelChange)="username = $event" />

<p>Hello {{username}}</p>

7. If we remove (), what happen is that event is not handle, so, component nevers get updated so expression does not reflect the changes on input.

<input [ngModel]="username" />

<p>Hello {{username}}</p>

8. Lets play now with the form

<form  (ngSubmit)="onSubmitTemplateBased()" novalidate>
    <p>
        <label>First Name:</label>
        <input type="text" [(ngModel)]="user.firstName" name="firstName" required>
    </p>
    <p>
        <label>Password:</label>
        <input type="password" [(ngModel)]="user.password" name="password" required>
    </p>
    <p>
        <button type="submit">Submit</button>
    </p>
</form>

* Change code in our component, to handle the submit event

```diff
import { Component } from '@angular/core';

@Component({
    selector: 'app-template-driven-form',
    templateUrl: './app-template-driven-form.component.html'
})

export class TemplateDrivenFormComponent {
+    user: any = {};
+
+    onSubmitTemplateBased() {
+        console.log(this.user);
+    }
}
```

* Cool we got the values in user, thanks to [()]

9. For last if we want to disable the submit button we have to get a reference to the form.

<form #templateForm="ngForm" (ngSubmit)="onSubmitTemplateBased(templateForm.value)" novalidate>
    <p>
        <label>First Name:</label>
        <input type="text" (ngModel)="firstName" name="firstName" required>
    </p>
    <p>
        <label>Password:</label>
        <input type="password" (ngModel)="password" name="password" required>
    </p>
    <p>
        <button type="submit" [disabled]="!templateForm.valid">Submit</button>
    </p>
</form>


import { Component } from '@angular/core';

@Component({
    selector: 'app-template-driven-form',
    templateUrl: './app-template-driven-form.component.html'
})

export class TemplateDrivenFormComponent {
    // user: any = {};

    onSubmitTemplateBased(formsvalue) {
        console.log(formsvalue);
    }
}
