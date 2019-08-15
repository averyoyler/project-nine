import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GolfCourse {
  id: string;
  name: string;
  image: string;
}

interface GolfCourses {
  courses: GolfCourse[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseId: any;

  constructor(private httpClient: HttpClient) { }

  getGolfCourses(): Observable<GolfCourse[]> {
    const url = "http://golf-courses-api.herokuapp.com/courses";
    return this.httpClient.get<GolfCourses>(url).pipe(
      map(data => data.courses)
    );
  }

  getGolfCourse(): Observable<any> {
    const url = `http://golf-courses-api.herokuapp.com/courses/${this.courseId}`;
    return this.httpClient.get(url)
  }

  getGolfCourseId() {
    console.log('id: ' + this.courseId);
    return this.courseId;
  }

  setGolfCourse(id) {
    this.courseId = id;
  }
}


// courseUrl = "http://golf-courses-api.herokuapp.com";

// getCourses(): Observable<Object> {
//   const courses = this.httpClient.get(this.courseUrl);
//   console.log(courses);
//   return courses;
// }