import { Routes } from '@angular/router';
import { GameListComponent } from './game/game-list/game-list.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { CreateSellerComponent } from './seller/create-seller/create-seller.component';

export const appRoutes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: CreateGameComponent },
  { path: 'seller/new', component: CreateSellerComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
];
