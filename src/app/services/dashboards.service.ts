import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Graphe } from '../models/graphe';
@Injectable({
  providedIn: 'root'
})
export class dashboardsService {

  REST_API: string = environment.ENDPOINTS.api

  constructor(private http: HttpClient) { }

  getGraphe() {
    return this.http.get<Graphe[]>(`${this.REST_API}/graphe`)
  }
}
