import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-selection/course.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  course: any;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getGolfCourseId();
    this.courseService
    .getGolfCourse()
    .subscribe(data => console.log(data.data));
  }

  getSingleCourse(element) {
    const id = element.currentTarget.id;
    this.courseService
    .getGolfCourse()
    .subscribe(data => this.course = data.data);
  }

}
