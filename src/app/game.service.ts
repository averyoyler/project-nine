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
        "name": "Ut Fugiat"
      },
      {
        "name": "Minim Excepteur"
      },
      {
        "name": "Quis Cillum"
      },
      {
        "name": "Velit Ex"
      },
      {
        "name": "Eu Lorem"
      },
      {
        "name": "Ullamco Cupidatat"
      },
      {
        "name": "Proident Incididunt"
      },
      {
        "name": "Aliquip Id"
      },
      {
        "name": "Lorem Sint"
      },
      {
        "name": "Ex Do"
      },
      {
        "name": "Incididunt In"
      },
      {
        "name": "Aliqua Sunt"
      },
      {
        "name": "Adipisicing Veniam"
      },
      {
        "name": "Adipisicing Proident"
      },
      {
        "name": "Ex magna"
      },
      {
        "name": "Id Enim"
      },
      {
        "name": "Ullamco Minim"
      },
      {
        "name": "Nisi Duis"
      },
      {
        "name": "Et Cupidatat"
      },
      {
        "name": "Amet Ullamco"
      },
      {
        "name": "Aute Reprehenderit"
      },
      {
        "name": "Pariatur Culpa"
      },
      {
        "name": "Eiusmod Deserunt"
      },
      {
        "name": "Ex Consectetur"
      },
      {
        "name": "Aute Nostrud"
      },
      {
        "name": "In Mollit"
      },
      {
        "name": "Consequat Qui"
      },
      {
        "name": "Et Adipisicing"
      },
      {
        "name": "Consequat Eiusmod"
      },
      {
        "name": "Do Officia"
      },
      {
        "name": "Do Consequat"
      },
      {
        "name": "Quis Sit"
      },
      {
        "name": "Esse Cupidatat"
      },
      {
        "name": "Pariatur Anim"
      },
      {
        "name": "Mollit Proident"
      },
      {
        "name": "Commodo Excepteur"
      },
      {
        "name": "Reprehenderit Labore"
      },
      {
        "name": "Reprehenderit In"
      },
      {
        "name": "Officia Ut"
      },
      {
        "name": "Excepteur Id"
      },
      {
        "name": "Nulla Veniam"
      },
      {
        "name": "Velit Ea"
      },
      {
        "name": "Sunt Anim"
      },
      {
        "name": "Occaecat Esse"
      },
      {
        "name": "Irure Lorem"
      },
      {
        "name": "Id Elit"
      },
      {
        "name": "Veniam Sit"
      },
      {
        "name": "Laboris Eiusmod"
      },
      {
        "name": "Id Adipisicing"
      },
      {
        "name": "Nostrud Velit"
      },
      {
        "name": "Et Aute"
      },
      {
        "name": "Enim Lorem"
      },
      {
        "name": "Consequat Enim"
      },
      {
        "name": "Laborum Consequat"
      },
      {
        "name": "Cupidatat Elit"
      },
      {
        "name": "Non Cupidatat"
      },
      {
        "name": "Enim Esse"
      },
      {
        "name": "Irure Magna"
      },
      {
        "name": "Magna Cillum"
      },
      {
        "name": "Irure Cit"
      },
      {
        "name": "Labore Eu"
      },
      {
        "name": "Anim Dolore"
      },
      {
        "name": "Adipisicing Labore"
      },
      {
        "name": "Do Tempor"
      },
      {
        "name": "Occaecat Dolor"
      },
      {
        "name": "Id Labore"
      },
      {
        "name": "Excepteur Incididunt"
      },
      {
        "name": "Id Velit"
      },
      {
        "name": "Ex Est"
      },
      {
        "name": "Sunt Pariatur"
      },
      {
        "name": "Proident Aute"
      },
      {
        "name": "Ut Exercitation"
      },
      {
        "name": "Ut Ea"
      },
      {
        "name": "Nisi Labore"
      },
      {
        "name": "Esse Est"
      },
      {
        "name": "Ipsum Cupidatat"
      },
      {
        "name": "Consequat Esse"
      },
      {
        "name": "Cillum Excepteur"
      },
      {
        "name": "Velit Aliquip"
      },
      {
        "name": "Sit Officia"
      },
      {
        "name": "Sit Velit"
      },
      {
        "name": "Quis Non"
      },
      {
        "name": "Incididunt Consectetur"
      },
      {
        "name": "Nulla Ipsum"
      },
      {
        "name": "Pariatur Excepteur"
      },
      {
        "name": "Labore Lorem"
      },
      {
        "name": "Cillum Elit"
      },
      {
        "name": "Sunt Do"
      },
      {
        "name": "Qui Velit"
      },
      {
        "name": "Deserunt Deserunt"
      },
      {
        "name": "Id Ut"
      },
      {
        "name": "Ullamco Irure"
      },
      {
        "name": "Anim Exercitation"
      },
      {
        "name": "Laborum In"
      },
      {
        "name": "Sint Deserunt"
      },
      {
        "name": "Et Reprehenderit"
      },
      {
        "name": "Tempor Non"
      },
      {
        "name": "Officia Dolor"
      },
      {
        "name": "Nostrud Dolore"
      },
      {
        "name": "Velit Fugiat"
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

  updateTee(tee, gameId) {
    this.gamesRef.doc(gameId).update({tee: tee})
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
