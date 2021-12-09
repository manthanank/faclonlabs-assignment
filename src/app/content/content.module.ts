import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';

@NgModule({
  imports: [
    ContentRoutingModule,
    CommonModule,
    MatGridListModule,
    //MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule
  ],
  declarations: [ContentComponent,TableComponent],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class ContentModule { }
