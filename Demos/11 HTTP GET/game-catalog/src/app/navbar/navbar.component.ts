import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav { font-size: 15px; }
    li > a.active { color: #F97924 }
  `]
})
export class NavbarComponent {}
