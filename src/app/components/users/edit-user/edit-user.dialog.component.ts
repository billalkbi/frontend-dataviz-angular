import { Component,  Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
export const MY_FORMAT: MatDateFormats = {
  parse: {
    // tslint:disable-next-line: no-duplicate-string
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: 'node-edit-user',
  templateUrl: './edit-user.dialog.component.html',
  styleUrls: ['./edit-user.dialog.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
})
export class EditUserDialogComponent implements OnInit {

  hide = true;
  errorMessage: any;
   userEditForm= new FormGroup({
    firstname: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    lastname: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    adresse: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    type: new FormControl('',[ Validators.required]),
    dateBirth: new FormControl('',[ Validators.required]),
    email: new FormControl('',[ Validators.required, Validators.email, Validators.minLength(5)]),
    username: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    password: new FormControl('',Validators.minLength(10)),

  })
  constructor(private usersService: UsersService,
               protected notificationService : NotificationService,
              public dialogRef: MatDialogRef<EditUserDialogComponent>,

              @Inject(MAT_DIALOG_DATA) public id: any
) {}

  ngOnInit() {

    this.usersService.getUser(this.id)
      .subscribe(user=>{
        this.userEditForm.controls.firstname.setValue(user['firstname']);
        this.userEditForm.controls.lastname.setValue(user['lastname']);
        this.userEditForm.controls.adresse.setValue(user['adresse']);
        this.userEditForm.controls.type.setValue(user['type']);
        this.userEditForm.controls.dateBirth.setValue(user['dateBirth']);
        this.userEditForm.controls.email.setValue(user['email']);
        this.userEditForm.controls.username.setValue(user['username']);
        this.userEditForm.controls.password.setValue(user['password']);
      })
 }



 saveEdit() {

    this.usersService.updateUser(this.id,this.userEditForm.value)  .subscribe(() => {

      this.notificationService.success('modification terminé');

    }, (err) => {
          this.errorMessage=err;
           console.log(this.userEditForm.value);
           this.notificationService.warn('modification modification echoué veillez résseyer');
       });

  this.dialogRef.close();


  }

  onNoClick(): void {
    this.dialogRef.close();
   }




}

