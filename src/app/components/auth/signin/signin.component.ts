import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'node-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit  {
  signInForm : any;
  typeUser:any;
   hide:any= true;
   errorMessage: any;
   helper = new JwtHelperService();
  constructor(private formBuilder : FormBuilder,
              protected notificationService : NotificationService,
              public authService : AuthService,) { }

ngOnInit(): void{
  this.signInForm= this.formBuilder.group({
    username : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
    password : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)])
  })
}


login() {

    this.authService.login(this.signInForm.value);
}

}
