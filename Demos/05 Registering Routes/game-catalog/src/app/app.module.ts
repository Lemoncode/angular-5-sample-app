import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { GameStockService } from './services/gameStock.service';
import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { GameListComponent } from './game/game-list/game-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
