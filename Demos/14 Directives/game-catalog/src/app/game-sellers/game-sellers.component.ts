import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameStockService } from '../services/gameStock.service';
import { ISeller } from '../models/seller.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html',
})
export class GameSellersComponent implements OnInit {
  gameName: string;
  sellers: ISeller[];
  addMode = false;
  filterBy = 'all';
  sortBy = 'asc';
  constructor(private route: ActivatedRoute, private gameStockService: GameStockService) { }

  toggleAddSeller() {
    this.addMode = !this.addMode;
  }

  ngOnInit() {
    this.gameStockService.getGame(this.route.snapshot.params['id'])
      .subscribe((game) => {
        this.gameName = game.name;
        this.sellers = game.sellers;
      });
  }
}
