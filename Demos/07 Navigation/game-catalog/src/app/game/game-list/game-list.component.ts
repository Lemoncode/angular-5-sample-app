import { Component, OnInit } from '@angular/core';
import { GameStockService } from '../../services/gameStock.service';
import { Game } from '../../models/game.model';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];

  constructor(private gameStockService: GameStockService) {}

  gameChangeHandler($event: any) {
    const sellers = this.gameStockService.getGameSellers($event);
    const selectedGame = this.gameStockService.getGame($event);
    this.selectedGameInfo = `${selectedGame.name}, Age:${selectedGame.getYearsFromRelease()}`;
    this.sellers = (sellers && sellers.length > 0) ? sellers : [];
  }

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
    this.games = this.gameStockService.getGames();
  }

}
