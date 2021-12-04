import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
@NgModule({
  imports: [
    ContentRoutingModule,
    ReactiveFormsModule,MatFormFieldModule,
    MatCommonModule,MatGridListModule,
    MatGridTile,MatSelectModule,MatDatepickerModule,
    MatDatepickerToggle,
    CommonModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [ContentComponent]
})
export class ContentModule { }
