import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GameStockService } from './gameStock.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameRouterActivatorService implements CanActivate {
  constructor(private gameStockService: GameStockService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const gameExists = !!this.gameStockService.getGame(route.params['id']);
    if (!gameExists) {
      this.router.navigate(['/404'])
        .then(() => true);
    }
    return gameExists;
  }
}
