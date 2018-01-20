import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, reduce, flatMap, merge, skip } from 'rxjs/operators';

/*
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
*/

/*
// values
var letters = 'J,A,M,I,E'.split(',');
var interval = 2000;

// streams
var letters$ = Rx.Observable.from(letters);
var timer$ = Rx.Observable.timer(0, interval);
var lettersOverTime$ = Rx.Observable.zip(letters$, timer$, (item, i) => item);
var eventualWord$ = lettersOverTime$.scan((word, letter) => word + letter, '').last();

// log the next letter every 2 secs
lettersOverTime$.subscribe(console.log);

// log the full word when complete
eventualWord$.subscribe(console.log);

/* output:
 *
 * lettersOverTime$ : "J"---"A"---"M"---"I"---"E"---|
 * eventualWord$    : -------------------------------"JAMIE"|
 */



@Injectable()
export class GameStockService {
  constructor(private http: HttpClient) { }

  mapGame(game: any): Game {
    return (game.sellers && game.sellers.length) ?
      new Game(
        game.name,
        game.dateRelease.toString(),
        game.imageUrl,
        game.sellers
      ) :
      new Game(
        game.name,
        game.dateRelease.toString(),
        game.imageUrl,
      );
  }
  // Reference: https://gist.github.com/JamieMason/303c5fc90b28c28a804e3f7ea9ab01f1
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`/api/games`)
      .pipe(
        flatMap(g => g),
        map(this.mapGame),
        merge(s => s),
        skip(1),
        reduce((acc, value) => {
          return [...acc, value]
        }, [])
      );
  }

  getGame(name: string): Observable<Game> {
    return this.http.get<Game>(`/api/games/${name}`);
  }

  getGameSellers(name: string): Observable<ISeller[]> {
    return this.getGame(name)
      .pipe(
      map(g => g.sellers)
      )
  }

  addGame(game: Game): Observable<Game> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Game>(
      '/api/games',
      game,
      httpOptions
    );
  }
}
