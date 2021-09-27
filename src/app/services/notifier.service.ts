import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifierService {


  constructor() { }

  private refreshLoginStatus = new Subject<any>();
  refreshLoginStatuseNotifier$ = this.refreshLoginStatus.asObservable();
  refreshLoginStatusFunc() {
    this.refreshLoginStatus.next();

  }

}
