import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceBackupService {

  currentUserObs = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserObs.asObservable();

  constructor(private http :HttpClient) { }
 

  login(model :User){
    return this.http.post("https://localhost:5001/api/account/login",model).pipe(
      map(response=>{
        const user = response;
        localStorage.setItem('user',JSON.stringify(user));
        
      })
    );
  }

  setCurrentUser(user :User){
    this.currentUserObs.next(user);
  }
  logout(){
    this.currentUserObs.next(undefined);
  }
}
