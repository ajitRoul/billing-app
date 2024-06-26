import { Component, OnInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../models/user';
import { SharedModule } from '../shared/shared.module';
import { DbService } from '../db/db.service';
import { INVOICE_INITIAL_STATE, INVOICE_SIGNAL, USER_SIGNAL } from '../signals';
import { IInvoice } from '../../models/invoice';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, SharedModule, MatTableModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user: IUser = USER_SIGNAL();
  originalInvoices: IInvoice[] = [];
  invoices: IInvoice[] = [];
  displayedColumns = ['id', 'date', 'name', 'phone', 'totalAmount', 'actions'];
  search = '';
  constructor(
    private readonly route: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private readonly dbService: DbService
  ) {
    effect(() => {
      const state = USER_SIGNAL();
      this.user = state;
    });
    INVOICE_SIGNAL.set(INVOICE_INITIAL_STATE);
  }

  ngOnInit(): void {
    this.dbService.getAllInvoices().subscribe({
      next: (invoices: IInvoice[]) => {
        this.originalInvoices = JSON.parse(JSON.stringify(invoices));
        this.invoices = invoices;
      },
      error: (error) => {
        console.error('Error fetching invoices', error);
      },
    });
  }

  newBill() {
    if (this.user) {
      this.route.navigate(['/newbill']);
    } else {
      const action = this.snackbar.open(
        'Please update user details to continue',
        'Close',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );

      action.afterDismissed().subscribe(() => {
        this.openUpdateUserDialog();
      });
    }
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
      }
    });
  }

  editInvoice(invoice: IInvoice) {
    INVOICE_SIGNAL.set(invoice);
    this.route.navigate(['/newbill']);
  }

  deleteInvoice(invoice: IInvoice) {
    if (invoice.id) {
      this.dbService.deleteInvoice(invoice.id).subscribe({
        next: (data) => {
          this.invoices = this.originalInvoices.filter((inv) => inv.id !== invoice.id);
          console.log('Invoice deleted successfully');
        },
        error: (error) => {
          console.error('Error while deleting invoice', error);
        },
      });
    }
  }

  searchInvoice() {
    
    if (this.search) {
      this.invoices = this.invoices.filter((invoice: IInvoice) => {
        if (invoice.customer.phone) {
          return invoice.customer.phone.includes(this.search);
        } else {
          return false;
        }
      });
    } else {
      this.invoices = JSON.parse(JSON.stringify(this.originalInvoices));
    }
  }
}
