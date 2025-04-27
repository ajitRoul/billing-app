import { Component, effect } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { USER_SIGNAL } from '../signals';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../models/user';
import { DbService } from '../db/db.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AuthService } from '../shared/auth.service';
import { HelpLineComponent } from '../help-line/help-line.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

   
  title = 'Billing System';
  user!: IUser;
  isAuthenticated = false;
  
  constructor(private readonly dialog: MatDialog,
    private readonly dbService: DbService,
    private readonly authService: AuthService
  ) {

    effect(() => { 
      console.log('User signal effect AppComponent')
      const state = USER_SIGNAL();
      this.user = state;
      this.title = this.user.companyName;
    })
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.isAuthenticated$.subscribe({
      next: (value) => {
        this.isAuthenticated = value;
      }
    })
    this.dbService.getUser().subscribe({
      next: (userArr: IUser[]) => {
        if(userArr.length > 0) {
          this.user = userArr[0];
          USER_SIGNAL.set(this.user);
          this.title = this.user.companyName;
        }
      },
      error: (error) => {
        console.error('Error fetching user', error);
      }
    });
  }

  openUpdateUserDialog(user?: IUser) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
      hasBackdrop: true,
      disableClose: true,
      maxHeight: '90vh',
      minWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {
        this.user = result;
        this.title = result.companyName
      }
    });
  }

  contact(user?: IUser) {
    const dialogRef = this.dialog.open(HelpLineComponent, {
      data: user,
      hasBackdrop: true,
      disableClose: true,
      maxHeight: '90vh',
      minWidth: '80vw',
    });
  }

  logout() {
    window.localStorage.removeItem('user');
    USER_SIGNAL.set(null);
    this.authService.logout();
  }

}
