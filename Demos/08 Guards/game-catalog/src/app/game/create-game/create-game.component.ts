import { Component } from '@angular/core';
import { GameStockService } from '../../services/gameStock.service';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
  isDirty = true;
  constructor(private gameStockService: GameStockService, private router: Router) {}

  createGame(formValues: any): void {
    this.isDirty = false;
    const game = this.mapper(formValues);
    this.gameStockService.addGame(game);
    this.router.navigate(['/games']);
  }

  private mapper(formValues: any): Game {
    return new Game(formValues.name, formValues.daterelease, formValues.imageurl);
  }

  cancel() {
    this.router.navigate(['/games']);
  }
}
