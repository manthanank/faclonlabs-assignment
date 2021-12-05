import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  imports: [
    ContentRoutingModule,
    CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule
  ],
  declarations: [ContentComponent]
})
export class ContentModule { }