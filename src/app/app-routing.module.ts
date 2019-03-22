import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./models/auth-guard";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignupComponent},
  /*{ path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard]  },*/
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: '',   redirectTo: '/home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
