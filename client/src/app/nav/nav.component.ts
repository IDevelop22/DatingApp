import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { AccountServiceBackupService } from '../_services/account-service-backup.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private accountService : AccountService,private router : Router,private toastr : ToastrService) { }
  model: any = {}
  loggedIn : boolean = false;
  currentUser$ : Observable<User> ;

  ngOnInit(): void {
   
    this.currentUser$ = this.accountService.currentUser$;
  }
  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log("login" + JSON.stringify(response));
      this.router.navigateByUrl("/members")
      

    },error =>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }



  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/")
   
  }


  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

}
