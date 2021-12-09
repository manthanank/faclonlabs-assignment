import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataService } from '../shared/data.service';
import { ContentModel } from './content.model';
import { Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit {
  formValue !: FormGroup;
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA;
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
