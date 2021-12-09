import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataService } from '../shared/data.service';
import { ContentModel } from './content.model';
import { Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit {
  public name = "manthan";
  public message = "";
  formValue !: FormGroup;
  constructor(private formbuilder: FormBuilder, private datas: DataService, private dialog: MatDialog) { }
  contentModelObj: ContentModel = new ContentModel();
  formData !: any;
  showAdd = true;
  showUpdate = false;
  dialogRef: any;
  ngOnInit(): void {
    //console.log(this.data);
    this.formValue = this.formbuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      number: [null, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
    })
    this.getAllUser();
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formValue.value);
  }
  // clickAddInform() {
  //   this.formValue.reset();
  //   this.showAdd = true;
  //   this.showUpdate = false;
  // }
  postUserDetails() {
    this.contentModelObj.name = this.formValue.value.name;
    this.contentModelObj.email = this.formValue.value.email;
    this.contentModelObj.address = this.formValue.value.address;
    this.contentModelObj.number = this.formValue.value.number;
    this.datas.postUser(this.contentModelObj)
      .subscribe(res => {
        console.log(res);
        alert("added")
        this.formValue.reset();
        this.getAllUser();
      },
        err => {
          alert('error')
        })
  }
  getAllUser() {
    this.datas.getUser()
      .subscribe(res => {
        this.formData = res;
      })
  }
  deleteUserDetails(row: any) {
    this.dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      //disableClose: false
      height: '200px',
      width: '300px',
      data: {
        name: row.name
      }
    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        console.log(result);
        this.datas.deleteUser(row.id)
          .subscribe(res => {
            console.log(result);
            this.getAllUser();
          })
      }
      this.dialogRef = null;
    });

  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
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
    this.datas.updateUser(this.contentModelObj, this.contentModelObj.id)
      .subscribe(res => {
        alert('updated')
        this.formValue.reset();
        this.getAllUser();
      })
  }
  openDialog() {
    this.dialog.open(ContentComponent)
  }
}
