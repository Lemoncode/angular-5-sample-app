import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';

const GAMES: Game[] = [
  new Game(
    'Super Mario Bros',
    '13 September 1985',
    // tslint:disable-next-line:max-line-length
    'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
    [
      {
        id: 1,
        name: 'Old shop',
        price: 95,
        amount: 2,
        isAvailable: true,
      },
      {
        id: 2,
        name: 'New shop',
        price: 115,
        amount: 1,
        isAvailable: true,
      },
      {
        id: 3,
        name: 'Regular shop',
        price: 135,
        amount: 0,
        isAvailable: false,
      }
    ]
  ),
  new Game(
    'Legend of Zelda',
    '21 February 1986',
    // tslint:disable-next-line:max-line-length
    'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
    [
      {
        id: 3,
        name: 'Old shop',
        price: 125,
        amount: 0,
        isAvailable: false,
      },
      {
        id: 4,
        name: 'New shop',
        price: 145,
        amount: 1,
        isAvailable: true,
      },
    ]
  ),
  new Game(
    'Sonic',
    '26 June 1981',
    'https://www-sonicthehedgehog-com-content.s3.amazonaws.com/test/Sonic_Mania_Block_3_video_1_2.jpg',
  ),
];

@Injectable()
export class GameStockService {
  getGames(): Game[] {
    return GAMES;
  }

  getGame(name: string): Game {
    return GAMES.find((game) => game.name === name);
  }

  getGameSellers(name: string): ISeller[] {
    return this.getGame(name).sellers || null;
  }

  addGame(game: Game): void {
    GAMES.push(game);
  }
}
