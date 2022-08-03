import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  REST_API: string = environment.ENDPOINTS.api
  usersData : User[]=[];
  constructor(private http: HttpClient) { }

  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}


  searcheUser(term :string): Observable<User[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<User[]>(`${this.REST_API}/users?lastname=${term}`).pipe(
      tap(_=>this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUser',[]))
    );
  }

  getUsers() {
    return this.http.get<User[]>(`${this.REST_API}/users`)
  }

  getUser(id: string): Observable<User> {
    const url = `${this.REST_API}/user/${id}`;
    return this.http.get<User>(url).pipe(

      catchError(this.handleError<any>('getUser'))
    );

  }

  updateUser(id:any, user:User): Observable<any> {
    let API_URL = `${this.REST_API}/user/${id}`;
    return this.http.put(API_URL,user)
      .pipe(
        catchError(this.handleError<any>('updateUser'))
      )
  }

  deleteUser(id: string): Observable<User> {
    const url = `${this.REST_API}/user/${id}`;
    return this.http.delete<User>(url).pipe(
      catchError(this.handleError<any>('deleteUser'))
    )
  }

}
