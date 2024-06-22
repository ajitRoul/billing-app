import { Component, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from './update-user/update-user.component';
import { IUser } from '../models/user';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { USER_SIGNAL } from './signals';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule, DbModule, UserInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  
  title = 'Billing System';
  user!: IUser;

  constructor() {
    effect(() => { 
      console.log('User signal effect AppComponent')
      const state = USER_SIGNAL();
      this.user = state;
      this.title = this.user.companyName;
    })
  }

  
}
