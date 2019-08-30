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

  private names: any;
  private gamesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.gamesRef = this.db.collection<Game>('games');
    this.names = [
      {
        "name": "ut fugiat"
      },
      {
        "name": "minim excepteur"
      },
      {
        "name": "quis cillum"
      },
      {
        "name": "velit ex"
      },
      {
        "name": "eu Lorem"
      },
      {
        "name": "ullamco cupidatat"
      },
      {
        "name": "proident incididunt"
      },
      {
        "name": "aliquip id"
      },
      {
        "name": "Lorem sint"
      },
      {
        "name": "ex do"
      },
      {
        "name": "incididunt in"
      },
      {
        "name": "aliqua sunt"
      },
      {
        "name": "adipisicing veniam"
      },
      {
        "name": "adipisicing proident"
      },
      {
        "name": "ex magna"
      },
      {
        "name": "id enim"
      },
      {
        "name": "ullamco minim"
      },
      {
        "name": "nisi duis"
      },
      {
        "name": "et cupidatat"
      },
      {
        "name": "amet ullamco"
      },
      {
        "name": "aute reprehenderit"
      },
      {
        "name": "pariatur culpa"
      },
      {
        "name": "eiusmod deserunt"
      },
      {
        "name": "ex consectetur"
      },
      {
        "name": "aute nostrud"
      },
      {
        "name": "in mollit"
      },
      {
        "name": "consequat qui"
      },
      {
        "name": "et adipisicing"
      },
      {
        "name": "consequat eiusmod"
      },
      {
        "name": "do officia"
      },
      {
        "name": "do consequat"
      },
      {
        "name": "quis sit"
      },
      {
        "name": "esse cupidatat"
      },
      {
        "name": "pariatur anim"
      },
      {
        "name": "mollit proident"
      },
      {
        "name": "commodo excepteur"
      },
      {
        "name": "reprehenderit labore"
      },
      {
        "name": "reprehenderit in"
      },
      {
        "name": "officia ut"
      },
      {
        "name": "excepteur id"
      },
      {
        "name": "nulla veniam"
      },
      {
        "name": "velit ea"
      },
      {
        "name": "sunt anim"
      },
      {
        "name": "occaecat esse"
      },
      {
        "name": "irure Lorem"
      },
      {
        "name": "id elit"
      },
      {
        "name": "veniam sit"
      },
      {
        "name": "laboris eiusmod"
      },
      {
        "name": "id adipisicing"
      },
      {
        "name": "nostrud velit"
      },
      {
        "name": "et aute"
      },
      {
        "name": "enim Lorem"
      },
      {
        "name": "consequat enim"
      },
      {
        "name": "laborum consequat"
      },
      {
        "name": "cupidatat elit"
      },
      {
        "name": "non cupidatat"
      },
      {
        "name": "enim esse"
      },
      {
        "name": "irure magna"
      },
      {
        "name": "magna cillum"
      },
      {
        "name": "irure sit"
      },
      {
        "name": "labore eu"
      },
      {
        "name": "anim dolore"
      },
      {
        "name": "adipisicing labore"
      },
      {
        "name": "do tempor"
      },
      {
        "name": "occaecat dolor"
      },
      {
        "name": "id labore"
      },
      {
        "name": "excepteur incididunt"
      },
      {
        "name": "id velit"
      },
      {
        "name": "ex est"
      },
      {
        "name": "sunt pariatur"
      },
      {
        "name": "proident aute"
      },
      {
        "name": "ut exercitation"
      },
      {
        "name": "ut ea"
      },
      {
        "name": "nisi labore"
      },
      {
        "name": "esse est"
      },
      {
        "name": "ipsum cupidatat"
      },
      {
        "name": "consequat esse"
      },
      {
        "name": "cillum excepteur"
      },
      {
        "name": "velit aliquip"
      },
      {
        "name": "sit officia"
      },
      {
        "name": "sit velit"
      },
      {
        "name": "quis non"
      },
      {
        "name": "incididunt consectetur"
      },
      {
        "name": "nulla ipsum"
      },
      {
        "name": "pariatur excepteur"
      },
      {
        "name": "labore Lorem"
      },
      {
        "name": "cillum elit"
      },
      {
        "name": "sunt do"
      },
      {
        "name": "qui velit"
      },
      {
        "name": "deserunt deserunt"
      },
      {
        "name": "id ut"
      },
      {
        "name": "ullamco irure"
      },
      {
        "name": "anim exercitation"
      },
      {
        "name": "laborum in"
      },
      {
        "name": "sint deserunt"
      },
      {
        "name": "et reprehenderit"
      },
      {
        "name": "tempor non"
      },
      {
        "name": "officia dolor"
      },
      {
        "name": "nostrud dolore"
      },
      {
        "name": "velit fugiat"
      }
    ]
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
    const number = Math.floor(Math.random() * 100);
    const randomName = this.names[number].name;

    const game = {
      course: courseId,
      tee: tee,
      name: randomName,
      players: [
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
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
