import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Graphe } from '../models/graphe';
import { User } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  REST_API: string = environment.ENDPOINTS.api

  constructor(private http: HttpClient) { }

  getDashboards(id:string) {
    const url = `${this.REST_API}/dashboards/${id}`;
    return this.http.get<User>(url).pipe(

      catchError(this.handleError<any>('getDashboards'))
    );
  }


  getGraphe() {
    return this.http.get<Graphe[]>(`${this.REST_API}/graphe`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
}
