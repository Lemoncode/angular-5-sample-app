import { Component, Input } from '@angular/core';
import { ISeller } from '../models/seller.model';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html',
})
export class GameSellersComponent {
  @Input() sellers: ISeller[];
  @Input() gameName: string;
}
