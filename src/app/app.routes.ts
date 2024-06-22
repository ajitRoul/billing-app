import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'newbill', component: NewBillComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'preview', component: PreviewComponent},
    {path: '**', pathMatch: 'full', component: ErrorComponent },
];
