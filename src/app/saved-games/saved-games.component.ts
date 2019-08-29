import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.scss']
})
export class SavedGamesComponent implements OnInit {

  savedGames: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService
    .getSavedGames()
    .subscribe(data => {
      console.log(data);
      this.savedGames = data;
    });
  }

  select(element) {

  }

  selectGame() {

  }

}
