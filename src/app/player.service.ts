import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './interfaces/player';
import { Game } from './interfaces/game';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersRef: AngularFirestoreCollection<Player>;
  private courseRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.playersRef = this.db.collection<Player>('players');
    this.courseRef = this.db.collection<Game>('games');
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
    return this.courseRef.doc<Game>(id)
      .valueChanges()
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }
}
