import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './interfaces/player';
import { Game } from './interfaces/game';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private playersRef: AngularFirestoreCollection<Player>;
  private gamesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.playersRef = this.db.collection<Player>('players');
    this.gamesRef = this.db.collection<Game>('games');
  }

  getPlayer(id: string): Observable<Player> {
    // return this.companyRef.valueChanges();
    return this.playersRef.doc<Player>(id)
      .valueChanges()
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getPlayers(): Observable<Player[]> {
    return this.playersRef.snapshotChanges()
      .pipe( // pipes are used when we want to do something extra with the observable -- expects operators
        map((players: DocumentChangeAction<Player>[]): Player[] => { // map expects a function -- works a lot like
          return players.map((player: DocumentChangeAction<Player>): Player => {
            return {
              id: player.payload.doc.id,
              name: player.payload.doc.data().name,
              scores: player.payload.doc.data().scores,
            };
          });
        }),
        catchError(this.errorHandler) 
      ); 
  }

  getSavedGame(id: string): Observable<Game> {
    return this.gamesRef.doc<Game>(id)
      .valueChanges()
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createNewGame(courseId, tee) {
    const game = {
      course: courseId,
      tee: tee,
      players: [
        {
          name: null,
          scores: []
        },
        {
          name: null,
          scores: []
        },
        {
          name: null,
          scores: []
        },
        {
          name: null,
          scores: []
        }
      ]
    }
    return this.gamesRef.add(game) // this.companyRef.set(company)
      .then(_ => console.log('Success on set'))
      .catch(error => console.log('add', error));
  }

  saveGame(gameId, game) {
    return this.gamesRef.doc(gameId).update(game) // this.companyRef.update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }
}
