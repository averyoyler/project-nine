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

  private gamesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.gamesRef = this.db.collection<Game>('games');
  }

  getSavedGame(id: string): Observable<Game> {
    return this.gamesRef.doc<Game>(id)
      .valueChanges()
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getSavedGames(): Observable<Game[]> {
    return this.gamesRef.snapshotChanges()
      .pipe( // pipes are used when we want to do something extra with the observable -- expects operators
        map((games: DocumentChangeAction<Game>[]): Game[] => { // map expects a function -- works a lot like
          return games.map((game: DocumentChangeAction<Game>): Game => {
            return {
              id: game.payload.doc.id,
              course: game.payload.doc.data().course,
              name: game.payload.doc.data().name,
              players: game.payload.doc.data().players,
              tee: game.payload.doc.data().tee
            };
          });
        }),
        catchError(this.errorHandler) 
      ); 
  }

  createNewGame(courseId, tee, docId) {
    const game = {
      course: courseId,
      tee: tee,
      name: null,
      players: [
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        }
      ]
    }
    return this.gamesRef.doc(docId).set(game) // this.companyRef.set(company)
      .then(_ => console.log('Success on set'))
      .catch(error => console.log('add', error));
  }

  saveGame(gameId, game) {
    return this.gamesRef.doc(gameId).update(game) // this.companyRef.update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  updateGameName(gameId, name) {
    this.gamesRef.doc(gameId).update({name: name})
    .then(_ => console.log('Success on update'))
    .catch(error => console.log('update', error));
  }

  deleteGame(gameId) {
    this.gamesRef.doc(gameId).delete()
    .then(_ => console.log('Success on update'))
    .catch(error => console.log('update', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }
}
