import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';

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
    console.log(this.tee);
  }

  createNewGame() {
    this.gameService.createNewGame(this.courseId, this.tee)
    .then(_ => this.router.navigate(['/card/miIKCVY1IshdQ8V5Dr8E']));
  }
}
