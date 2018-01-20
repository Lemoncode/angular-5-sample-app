import { Routes } from '@angular/router';
import { GameListComponent } from './game/game-list/game-list.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { CreateSellerComponent } from './seller/create-seller/create-seller.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { Error404Component } from './errors/404.component';
import { GameRouterActivatorService } from './services/game-router-activator.service';
import { CHECKDIRTY_TOKEN } from './services/checkDirty.service';

export const appRoutes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: CreateGameComponent, canDeactivate: [CHECKDIRTY_TOKEN] },
  { path: 'games/:id', component: GameSellersComponent, canActivate: [GameRouterActivatorService] },
  { path: 'seller/new', component: CreateSellerComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
];
