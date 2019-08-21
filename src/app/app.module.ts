import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CourseSelectionComponent,
    CardComponent,
    FormComponent,
    FirstLetterUppercasePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
