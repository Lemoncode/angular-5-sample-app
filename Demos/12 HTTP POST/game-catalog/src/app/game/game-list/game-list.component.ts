import { Component, OnInit } from '@angular/core';
import { GameStockService } from '../../services/gameStock.service';
import { Game } from '../../models/game.model';
import { ISeller } from '../../models/seller.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];

  constructor(private gameStockService: GameStockService) { }

  gameChangeHandler($event: any) {
    this.gameStockService.getGameSellers($event)
      .subscribe((s) => {
        this.sellers = (s && s.length > 0) ? s : [];
      });
    this.gameStockService.getGame($event)
      .subscribe((selectedGame) => {
        const mappedGame = this.gameStockService.mapGame(selectedGame);
        this.selectedGameInfo = `${mappedGame.name}, Age:${mappedGame.getYearsFromRelease()}`;
      });
  }

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
    this.gameStockService.getGames()
      .subscribe((games) => this.games = games);
  }

}
