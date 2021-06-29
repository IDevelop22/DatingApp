import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL= 'https://localhost:5001/api/'
  currentUserObs=new  ReplaySubject<User>(1) ;
  currentUser$ = this.currentUserObs.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any){
   return this.http.post(this.baseURL + 'account/login',model).pipe(
     map((response :any)=>{
       const user = response;
       if(user){
         localStorage.setItem('user',JSON.stringify(user));
         this.currentUserObs.next(user);
       }
     })
   );
  }

  register(model:any){
    return this.http.post(this.baseURL + 'account/register',model).pipe(
      map((response :any)=>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserObs.next(user);
        }
      })
    );
   }

setCurrentUser(user : User){
  this.currentUserObs.next(user);
}

logout(){
  localStorage.removeItem('user');
  this.currentUserObs.next(undefined);
}

  
}
