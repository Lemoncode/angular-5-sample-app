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

1. Create a new file on common folder, messageToastr.drirective.ts. And put this code inside.

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

2. Lets add the directive to the module.
....
import { MessageToastrDirective } from './common/messageToastr.directive';
....

@NgModule({
  declarations: [
    .... 
    MessageToastrDirective
  ],
  ....
})
....

3. Now lets check that our directive it is wiring up to the html node where is placed. Open customers-list.component.html and write message-toastr on app-customer-summary.

<div class="container">
  <h1>
    {{title}}
  </h1>
  <div class="customers-container" *ngIf="show">
    <div *ngFor="let customer of customers" [routerLink]="['/customers', customer.id]">
      <app-customer-summary message-toastr (customerChange)="customerChangeHandler($event)" [customer]=customer>
      </app-customer-summary>
    </div>
  </div>
</div>

Open console on browser and watch results.

4. Now we are going to handle the click on the node element, where the directive is placed.

import { Directive, ElementRef, OnInit } from '@angular/core';
...

export class MessageToastrDirective implements OnInit {
    ...
    ngOnInit() {
        this.element.addEventListener('click', (evt) => {
            console.log(evt);
        });
    }
}

5. Now lets add a new service that will handle show a message to the user when the directive responses to the click event.

import { OpaqueToken } from '@angular/core';

export let TOASTR_TOKEN = new OpaqueToken('toastr');
export interface Toastr {
    success(message: string, title?: string): void;
    info(message: string, title?: string): void;
    warning(message: string, title?: string): void;
    error(message: string, title?: string): void;
}

This is just a wrapper around the toastr library.

6. Now we have to bring toastr, so lets import fron npm

$npm install jquery toastr --save

7. Before register this toastr as service we have to do a slightly modification in angular-CLI.json

{
  ....
  "apps": [
    {
      ...
      "styles": [
        "styles.css",
        "../node_modules/toastr/build/toastr.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.js",  
        "../node_modules/toastr/build/toastr.min.js"
      ],
      ....
    }
  ],
  ....
}

Try out => $ng build

This way we check out that everything it's ok. 

8. Now we can create the class that will be a wrapper around the toastr library

import { Injectable } from '@angular/core';
declare let toastr;

@Injectable()
export class Toastr {
    success(message: string, title?: string): void {
        if(title) {
            toastr.success(message, title);
        } else {
            toastr.success(message);
        }
    }
    info(message: string, title?: string): void {
        if(title) {
            toastr.info(message, title);
        } else {
            toastr.info(message);
        }
    }
    warning(message: string, title?: string): void {
        if(title) {
            toastr.warning(message, title);
        } else {
            toastr.warning(message);
        }
    }
    error(message: string, title?: string): void {
        if(title) {
            toastr.error(message, title);
        } else {
            toastr.error(message);
        }
    }
}

9. Now we can use it inside our directive

import { Directive, ElementRef, OnInit, Inject, Input } from '@angular/core';
import { Toastr } from './toastr.service'


@Directive({
    selector: '[message-toastr]' 
})

export class MessageToastrDirective implements OnInit {
    private element: HTMLElement;
    @Input('message-toastr') title: string;
    
    constructor(ref: ElementRef, private toastr: Toastr) {
        this.element = ref.nativeElement;
    }

    ngOnInit() {
        this.element.addEventListener('click', (evt) => {
            // TODO: Study a way to decouple.
            const rowElement = this.element.querySelector('.row');
            const firstName = rowElement.querySelector('.firstName').innerHTML;
            const lastName = rowElement.querySelector('.lastName').innerHTML; 
            const message = `Loaded profile ${lastName}, ${firstName}`;
            this.toastr.success(message, this.title);
        });
    }
}

10. To get this working we have to modify customer-summary.component.html. Note if we get

<div class="well" (click)="selectCustomer(customerId)">
  <div class="row">
    <input type="text" #customerId [value]=customer.id [hidden]=true/>
    <div class="col-md-3">
      <label>First Name:</label>
      <span class="firstName">{{customer.firstName}}</span>
    </div>
    <div class="col-md-3">
      <label>Last Name:</label>
      <span class="lastName">{{customer.lastName}}</span>
    </div>
    <div class="col-md-3">
      <label>Age:</label>
      <span>{{customer.getAge()}}</span>
    </div>
    <div class="col-md-3">
      <div class="portrait">
        <img class="img-reponsive" alt="Customer Image" [src]="customer.imageUrl"/>
      </div>
    </div>
  </div>
</div>
