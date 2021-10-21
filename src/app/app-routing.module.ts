import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './components/auth/auth.guard';
import { listDashboardsComponent } from './components/dashboard/list-dashboards.component';
import { DetailDashboardComponent } from './components/dashboard/detail-dashboard/detail-dashboard.component';
import { adminGuard } from './components/auth/adminGuard';




const routes: Routes = [

  {
    path:'home', canActivate: [AuthGuard] ,
    children :[
      {path: 'dashboards', children:[
        {path: ':projectId', component: listDashboardsComponent}
      ]},

      {path : 'detail-dash' , children:[
       { path: ':dashId', component : DetailDashboardComponent}
      ] },
      {path: 'projects', component: ProjectsComponent},
      {path: 'users', component: UsersComponent, canActivate: [adminGuard] }

    ]
  },

  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
