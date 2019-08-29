import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  courseId: string;
  tee: string;

  constructor(private route: ActivatedRoute, private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }

  select(teeType) {
    const id = teeType.target.id;
    this.tee = id;
    this.createNewGame();
  }

  createNewGame() {
    const docId = uuid.v4();
    this.gameService.createNewGame(this.courseId, this.tee, docId)
    .then(_ => this.router.navigate(['/card', docId]));
  }
}
