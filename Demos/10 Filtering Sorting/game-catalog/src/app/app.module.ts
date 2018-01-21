import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameStockService } from './services/gameStock.service';
import { SellerCategoryService } from './services/sellerCategory.service';
import { GameRouterActivatorService } from './services/game-router-activator.service';
import { CHECKDIRTY_TOKEN, checkDirtyState } from './services/checkDirty.service';
import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { CreateSellerComponent } from './seller/create-seller/create-seller.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Error404Component } from './errors/404.component';
import { SellerDetailsComponent } from './seller/seller-details/seller-details.component';
import { AvailablePipe } from './pipes/available.pipe';
import { SellerListComponent } from './seller/seller-list/seller-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GameListComponent,
    CreateSellerComponent,
    NavbarComponent,
    Error404Component,
    SellerDetailsComponent,
    AvailablePipe,
    SellerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    GameStockService,
    SellerCategoryService,
    GameRouterActivatorService,
    {
      provide: CHECKDIRTY_TOKEN,
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
