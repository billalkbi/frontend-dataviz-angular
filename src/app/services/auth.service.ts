import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable , of, throwError} from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/users';
import { NotificationService } from './notification.service';
import { NotifierService } from './notifier.service';

//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  REST_API: string = environment.ENDPOINTS.api;
  typeUser : string |undefined;
  helper = new JwtHelperService();

  constructor(private http: HttpClient,
              private notifierService : NotifierService,
              private router : Router,
              private notificationService : NotificationService) { }


	// Une méthode de connexion
	login(signInForm: any) {
    let API_URL = `${this.REST_API}/login`;
    return this.http.post(API_URL,signInForm).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);

        const decodedToken = this.helper.decodeToken(res.token);



        this.notifierService.refreshLoginStatusFunc();
        this.router.navigateByUrl('/home/acceuil')
      },
      err=>{
        this.notificationService.warn('echec de connexion veuillez réesseyer!');

      });
	}


  signup(user: User): Observable<any> {
    let API_URL = `${this.REST_API}/users`;
    return this.http.post(API_URL,user)
      .pipe(
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
