import { Routes } from '@angular/router';
import { GameListComponent } from './game/game-list/game-list.component';
import { CreateGameComponent } from './game/create-game/create-game.component';

export const appRoutes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: CreateGameComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
];
