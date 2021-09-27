import { Component, Inject,  OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'node-add-user.dialog',
  templateUrl: './add-user.dialog.component.html',
  styleUrls: ['./add-user.dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  hide = true;
  signUpForm: any;
  errorMessage: string |undefined;


  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private formBuilder : FormBuilder,
              private auth : AuthService,
              protected notificationService : NotificationService,) { }



  ngOnInit(): void {
    this.signUpForm= this.formBuilder.group({
      firstname: this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      lastname : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      dateBirth: this.formBuilder.control("",[ Validators.required]),
      adresse : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      type : this.formBuilder.control("",[ Validators.required]),
      username : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      email : this.formBuilder.control("",[ Validators.required, Validators.email, Validators.minLength(5)]),
      password : this.formBuilder.control("",[ Validators.required, Validators.minLength(10)]),


    });

  }

  public saveAdd(): void {
    this.auth.signup(this.signUpForm.value).subscribe(() => {
      console.log('Data added successfully!')

    }, (err) => {
      this.errorMessage=err;
      console.log(this.signUpForm.value);
      this.notificationService.warn('inscription echoué veillez résseyer');

  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
