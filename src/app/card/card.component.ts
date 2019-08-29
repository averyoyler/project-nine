import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-selection/course.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../interfaces/player';
import { Game } from '../interfaces/game';
import { GameService } from '../game.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  gameId: string;
  courseId: string;
  tee: string;
  holes: any;
  data: any;
  players: Player[];
  game: any;
  show: boolean = false;
  popup: boolean = false;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private gameService: GameService) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    // this.tee = this.route.snapshot.paramMap.get('tee');
    this.getSavedGame(this.gameId);
  }

  editPlayerName(element) {
    const newName = element.target.textContent;
    const playerId = element.target.id
    this.game.players[playerId].name = newName;
    console.log(this.game);
  }

  getSavedGame(id) {
    this.gameService
    .getSavedGame(id)
    .subscribe(data => {
      console.log("Saved Game:")
      console.log(data);
      this.game = data;
      this.courseId = data.course;
      this.tee = data.tee;
      this.players = data.players;
      this.getCourseData();
    });
  }

  getCourseData() {
    this.courseService
    .getGolfCourse(this.courseId)
    .subscribe(data => {
      this.data = data.data;
      this.holes = data.data.holes;
      console.log(this.holes);
      console.log(this.game.players[0].scores[0]);
    });
  }

  updateScore(event) {
    console.log(event.target.id);
    const playerId = (event.target.id.charAt(1) - 1);
    const holeNumber = (event.target.id.charAt(3) - 1);
    const newScore = event.target.textContent !== '' ? Number(event.target.textContent) : null;
    this.game.players[playerId].scores[holeNumber] = newScore;
  }

  updateGameName(element) {
    this.show = false;
    const name = element.value;
    this.game.name = name;
    this.gameService.saveGame(this.gameId, this.game)
  }

  saveGame() {
    if(!this.game.name) {
      this.show = true;
    }
    else {
      this.show = false;
      this.gameService.saveGame(this.gameId, this.game)
    }
    this.popup = true;
  }

  hide() {
    this.popup = false;
  }

}
