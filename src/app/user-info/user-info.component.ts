import { Component, effect } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { USER_SIGNAL } from '../signals';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../models/user';
import { DbService } from '../db/db.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

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

  constructor(private readonly dialog: MatDialog,
    private readonly dbService: DbService
  ) {

    effect(() => { 
      console.log('User signal effect AppComponent')
      const state = USER_SIGNAL();
      this.user = state;
      this.title = this.user.companyName;
    })
  }

  ngOnInit(): void {
    this.dbService.getUser().subscribe({
      next: (userArr: IUser[]) => {
        if(userArr.length > 0) {
          this.user = userArr[0];
          USER_SIGNAL.set(this.user);
          this.title = this.user.companyName;
        } else {
          this.openUpdateUserDialog();
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
      minHeight: '70vh',
      minWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {
        this.user = result;
        this.title = result.companyName
      }
    });
  }

}
