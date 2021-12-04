import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { ContentModel } from './content.model';
import { Validators ,FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  formValue !: FormGroup;
  contentModelobj: ContentModel = new ContentModel();
  formData !: any;
  showAdd ! : boolean;
  showUpdate ! : boolean;
  constructor(private formbuilder: FormBuilder,
    private data : DataService) { }

    ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        'sr':[null, Validators.required],
        'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'address' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'dob' : [null, Validators.required],
      'Email':[null, Validators.compose([Validators.required,Validators.email])],
      'gender':[null, Validators.required]
      
      })
      this.getAllformdata();
    }
    clickAddInform(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postFormDetails(){
      this.contentModelobj.sr = this.formValue.value.sr;
      this.contentModelobj.firstname = this.formValue.value.firstname;
      this.contentModelobj.lastname = this.formValue.value.lastname;
      this.contentModelobj.address = this.formValue.value.address;
      this.contentModelobj.dob = this.formValue.value.dob;
      this.contentModelobj.email = this.formValue.value.email;
      this.contentModelobj.gender = this.formValue.value.gender;
      this.data.postForm(this.contentModelobj)
      .subscribe(res=>{
        console.log('res')
        alert("added")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllformdata();
      },
      err=>{
        alert('error')
      })
    }
    getAllformdata(){
      this.data.getForm()
      .subscribe(res=>{
        this.formData = res;
      })
    }
    deleteFormdata(row:any){
      this.data.deleteForm(row.firstname)
      .subscribe(res=>{
        alert("deleted");
        this.getAllformdata();
      })
    }
    onEdit(row:any){
      this.showAdd = false;
      this.showUpdate = true;
      this.contentModelobj.firstname = row.firstname;
      this.formValue.controls['sr'].setValue(row.sr);
      this.formValue.controls['firstname'].setValue(row.firstname);
      this.formValue.controls['lastname'].setValue(row.lastname);
      this.formValue.controls['address'].setValue(row.address);
      this.formValue.controls['dob'].setValue(row.dob);
      this.formValue.controls['email'].setValue(row.dob);
      this.formValue.controls['gender'].setValue(row.address);
    }
    updateFormdetails(){
      this.contentModelobj.sr = this.formValue.value.sr;
      this.contentModelobj.firstname = this.formValue.value.firstname;
      this.contentModelobj.lastname = this.formValue.value.lastname;
      this.contentModelobj.address = this.formValue.value.gender;
      this.contentModelobj.dob = this.formValue.value.dob;
      this.contentModelobj.email = this.formValue.value.email;
      this.data.updateForm(this.contentModelobj.firstname)
      .subscribe(res=>
        {
          alert('updated')
          let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllformdata();
        })
    }

}
