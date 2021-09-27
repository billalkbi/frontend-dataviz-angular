import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'node-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signUpForm: any;
  errorMessage: string |undefined;


  constructor(private ngZone: NgZone,
              private router: Router,
              private formBuilder : FormBuilder,
              private auth : AuthService) { }



  ngOnInit(): void {
    this.signUpForm= this.formBuilder.group({
      firstname: this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      lastname : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      dateBirth: this.formBuilder.control("",[ Validators.required]),
      adresse : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      type : this.formBuilder.control("user",[ Validators.required]),
      username : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      email : this.formBuilder.control("",[ Validators.required, Validators.email, Validators.minLength(5)]),
      password : this.formBuilder.control("",[ Validators.required, Validators.minLength(10)]),


    });
  }

  public saveAdd(): void {
    this.auth.signup(this.signUpForm.value).subscribe(() => {
      console.log('Data added successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/signin'))
    }, (err) => {
      this.errorMessage=err;
      console.log(this.signUpForm.value);

  });
  }

}
