import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'newbill', component: NewBillComponent, canActivate: [authGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [authGuard]},
    {path: 'preview', component: PreviewComponent, canActivate: [authGuard]},
    {path: '**', pathMatch: 'full', component: ErrorComponent },
];