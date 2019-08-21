import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-selection/course.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  course: any;
  id: string;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.courseService
    .getGolfCourse(this.id)
    .subscribe(data => console.log(data.data));
  }

  getSingleCourse(element) {
    const id = element.currentTarget.id;
    this.courseService
    .getGolfCourse(id)
    .subscribe(data => this.course = data.data);
  }

}
