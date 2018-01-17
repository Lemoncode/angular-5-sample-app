import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.model';
import { ISeller } from './models/seller.model';
import { GameStockService } from './services/gameStock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Interactions Demo';
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];
  show = true;

  constructor(private gameStockService: GameStockService) {}

  gameChangeHandler($event: any) {
    const sellers = this.gameStockService.getGameSellers($event);
    const selectedGame = this.gameStockService.getGame($event);
    this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;
    this.sellers = (sellers && sellers.length > 0) ? sellers : [];
  }

  ngOnInit(): void {
    this.games = this.gameStockService.getGames();
  }
}
