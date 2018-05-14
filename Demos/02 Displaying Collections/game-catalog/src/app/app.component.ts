import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Displaying Collections Demo';
  games: Game[];
  // game: Game;

  constructor() { }

  ngOnInit(): void {
    this.games = [
      new Game(
        'Super Mario Bros',
        '13 September 1985',
        // tslint:disable-next-line:max-line-length
        'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
      ),
      new Game(
        'Legend of Zelda',
        '21 February 1986',
        // tslint:disable-next-line:max-line-length
        'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
      ),
      new Game(
        'Sonic',
        '26 June 1981',
        'https://i.ytimg.com/vi/dfFd7Bu6xnc/hqdefault.jpg',
      ),
    ];
  }
}
