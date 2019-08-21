import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-selection/course.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}

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
  }
}
