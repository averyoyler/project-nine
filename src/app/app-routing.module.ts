import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CourseSelectionComponent},
  { path: 'form/:id', component: FormComponent},
  { path: 'card/:id', component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
