import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'',component :HomeComponent},
  {path:'',
runGuardsAndResolvers :'always',
canActivate : [AuthGuard],
children :[
  {path:'messages',component :MessagesComponent},
  {path:'members',component :MemberListComponent},
  {path:'members/:id',component :MemberDetailComponent},
  {path:'lists',component :ListsComponent},
  
]},
{path:'errors',component :TestErrorsComponent},
{path:'not-found',component :NotfoundComponent},
{path:'server-error',component :ServerErrorComponent},
  {path:'**',component :HomeComponent,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
