import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataService } from '../shared/data.service';
import { ContentModel } from './content.model';
import { Validators, FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit {
  formValue !: FormGroup;
  constructor(private formbuilder: FormBuilder, private data: DataService, private dialog: MatDialog) { }
  contentModelObj: ContentModel = new ContentModel();
  formData !: any;
  //showAdd ! : boolean;
  //showUpdate ! : boolean;
  dialogRef: any;
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      number: [null, Validators.required]
    })
    this.getAllUser();
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formValue.value);
  }
  // clickAddInform(){
  //   this.formValue.reset();
  //   this.showAdd = true;
  //   this.showUpdate = false;
  // }
  postUserDetails() {
    this.contentModelObj.name = this.formValue.value.name;
    this.contentModelObj.email = this.formValue.value.email;
    this.contentModelObj.address = this.formValue.value.address;
    this.contentModelObj.number = this.formValue.value.number;
    this.data.postUser(this.contentModelObj)
      .subscribe(res => {
        console.log(res);
        alert("added")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      },
        err => {
          alert('error')
        })
  }
  getAllUser() {
    this.data.getUser()
      .subscribe(res => {
        this.formData = res;
      })
  }
  deleteUserDetails(row: any) {
    this.dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      //disableClose: false
    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.data.deleteUser(row.id)
          .subscribe(res => {
            this.getAllUser();
          })
      }
      this.dialogRef = null;
    });

  }
  onEdit(row: any) {
    //this.showAdd = false;
    //this.showUpdate = true;
    this.contentModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['number'].setValue(row.number);
  }
  updateUserDetails() {
    this.contentModelObj.name = this.formValue.value.name;
    this.contentModelObj.email = this.formValue.value.email;
    this.contentModelObj.address = this.formValue.value.address;
    this.contentModelObj.number = this.formValue.value.number;
    this.data.updateUser(this.contentModelObj, this.contentModelObj.id)
      .subscribe(res => {
        alert('updated')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }
  openDialog() {
    this.dialog.open(ContentComponent)

  }
}
