import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {

  courses: any[];
  course: any;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService
    .getGolfCourses()
    .subscribe(data => this.courses = data);
  }

  // getSingleCourse(element) {
  //   const id = element.currentTarget.id;
  //   this.courseService
  //   .getGolfCourse(id)
  //   .subscribe(data => this.course = data.data);
  // }

  setGolfCourse(element) {
    const id = element.currentTarget.id;
    this.courseService.setGolfCourse(id);
  }
}



// ngOnInit() {
//   const observable = this.courseService.getCourses();
//   observable.subscribe(
//     (courses: any[]) => (this.courses = courses)
//   );
// }