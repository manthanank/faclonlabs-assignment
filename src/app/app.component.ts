import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  public name = "manthan";
  public message = '';
  constructor(private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(MatConfirmDialogComponent)
  }
}
