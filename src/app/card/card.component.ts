import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-selection/course.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../interfaces/player';
import { Game } from '../interfaces/game';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  id: string;
  tee: string;
  holes: any;
  data: any;
  players: Player[];

  constructor(private courseService: CourseService, private route: ActivatedRoute, private playerService: PlayerService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tee = this.route.snapshot.paramMap.get('tee');

    this.courseService
    .getGolfCourse(this.id)
    .subscribe(data => {
      console.log(data.data);
      this.data = data.data;
      this.holes = data.data.holes;
      console.log(this.holes);
    });

    // this.getPlayers();
    // this.getPlayer('player1');
    this.getSavedGame('123');

  }

  editPlayerName(element) {
    console.log(element.target.id);
  }

  getPlayers() {
    this.playerService
    .getPlayers()
    .subscribe(data => {
      console.log(data);
    })
  }

  getPlayer(id) {
    this.playerService
    .getPlayer(id)
    .subscribe(data => {
      console.log(data);
    })
  }

  getSavedGame(id) {
    this.playerService
    .getSavedGame(id)
    .subscribe(data => {
      console.log(data);
    })
  }

}
