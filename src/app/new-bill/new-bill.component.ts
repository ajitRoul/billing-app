import { Component, OnInit, effect } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IBillItem, IItem } from '../../models/items';
import { ICustomer } from '../../models/customer';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { Router, RouterModule } from '@angular/router';
import { BILL_DETAILS_SIGNAL, CUSTOMER_SIGNAL, INVOICE_SIGNAL, USER_SIGNAL } from '../signals';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UpdateBillDetailsComponent } from '../update-bill-details/update-bill-details.component';
import { IBillDetails } from '../../models/bill-details';
import { UtilService } from '../shared/util.service';
import { DbService } from '../db/db.service';
import { IInvoice } from '../../models/invoice';

@Component({
  selector: 'app-new-bill',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, FormsModule, MatSnackBarModule,RouterModule],
  templateUrl: './new-bill.component.html',
  styleUrl: './new-bill.component.scss',
})
export class NewBillComponent implements OnInit {
  items: IBillItem[] = [];
  billForm!: FormGroup;
  isNew = true;
  finalAmount = 0;
  customerData!: ICustomer;
  billDetails!: IBillDetails;
  filteredItems: IItem[] = [];
  selectedItem: IItem = {} as IItem;
  allItems: IItem[] = [];

  displayedColumns = [
    'position',
    'name',
    'unitPrice',
    'quantity',
    'tax',
    'sellingPrice',
    'action',
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private _snackBar: MatSnackBar,
    private readonly util: UtilService,
    private readonly dbService: DbService
  ) {
    effect(() => {
      const state = INVOICE_SIGNAL();
      this.customerData = state.customer;
      this.items = state.items;
      this.finalAmount = state.totalAmount;
      this.billDetails = state;
    });
  }

  ngOnInit(): void {
    this.billForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      igstPercentage: ['', [Validators.required]],
      cgstPercentage: ['', [Validators.required]],
      sellingPrice: [{ value: 0, disabled: true }],
      taxAmount: [0],
      search: [''],
      description: [''],
    });
    this.getAllInvoices();
    this.getAllItems();

  }

  getAllInvoices() {
    const state = INVOICE_SIGNAL();
    this.customerData = state.customer;
    this.items = state.items;
    this.finalAmount = state.totalAmount;
    this.billDetails = state; 
  }

  updateCustomer($event: any) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      data: this.customerData,
      hasBackdrop: true,
      disableClose: true,
      minHeight: '70vh',
      minWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe((result: ICustomer) => {
      if (result) {
        CUSTOMER_SIGNAL.update((initailState: any) => ({ ...initailState, ...result }));
        this.customerData = result;
      }
    });
    $event.stopPropagation();
    $event.preventDefault();
  }

  updateBillDetails($event: any) {
    const dialogRef = this.dialog.open(UpdateBillDetailsComponent, {
      data: this.billDetails,
      hasBackdrop: true,
      disableClose: true,
      minHeight: '70vh',
      minWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe((result: IBillDetails) => {
      if (result) {
        this.billDetails = result;
        BILL_DETAILS_SIGNAL.update((initailState: IBillDetails) => ({
          ...initailState,...this.billDetails
        }))
      }
    });
    $event.stopPropagation();
    $event.preventDefault();
  }

  updateTotalAmout() {
    const { unitPrice, quantity, igstPercentage,cgstPercentage } = this.billForm.value;
    let sellingPrice = 0;
    if (unitPrice && quantity && igstPercentage & cgstPercentage) {
      const taxAmount = (unitPrice * quantity * (igstPercentage+cgstPercentage)) / 100;
      sellingPrice = unitPrice * quantity + taxAmount;
      this.billForm.patchValue({
        taxAmount,
        sellingPrice,
      });
    }
    return sellingPrice;
  }

  addBill() {
    if (this.billForm.valid) {
      const bill = this.billForm.value;
      bill.sellingPrice = this.updateTotalAmout();
      this.addUpdateItem(this.selectedItem, bill);
      this.items.push(bill);
      this.items = JSON.parse(JSON.stringify(this.items));
      this.calculateTotal();
      this.billForm.reset();
    }
  }

  addUpdateItem(selectedItem: IItem, bill: any) {
    if (this.equal(selectedItem, bill)) {
      return;
    }
    const formItem = {
      name: bill.name,
      unitPrice: bill.unitPrice,
      igstPercentage: bill.igstPercentage,
      cgstPercentage: bill.cgstPercentage,
      sellingPrice: bill.sellingPrice,
      description: bill.description,
    };
    let serveice = this.dbService.addItems(formItem);
    if (selectedItem.id) {
      const mergedItem = { ...selectedItem, ...bill };
      serveice = this.dbService.updateItems(mergedItem);
    }
    serveice.subscribe({
      next: (result) => {
        this.getAllItems();
        console.log('Item added successfully', result);
      },
      error: (error) => {
        console.error('Error adding item', error);
      },
    });
  }

  removeBill(index: number) {
    this.items.splice(index, 1);
    this.calculateTotal();
    this.items = JSON.parse(JSON.stringify(this.items));
  }

  editItem(index: number) {
    this.isNew = false;
    this.billForm.patchValue(this.items[index]);
    this.calculateTotal();
    this.removeBill(index);
  }

  calculateTotal() {
    this.finalAmount = this.items.reduce(
      (acc, item) => acc + item.sellingPrice,
      0
    );
  }

  confirmBill() {
    const user = USER_SIGNAL();
    if (
      user &&
      this.customerData.name &&
      this.items.length > 0 &&
      this.billDetails
    ) {
      const invoice: IInvoice = {
        ...this.billDetails,
        customer: this.customerData,
        items: this.items,
        totalAmount: this.finalAmount,
      };
      INVOICE_SIGNAL.update((initailState: any) => ({ ...initailState, ...invoice }));
      this.router.navigate(['/preview']);
    } else {
      let message = 'Please add bill details.';
      
      if (!this.customerData?.name) {
        message = 'Please fill customer details.';
      }
      if (this.items.length < 1) {
        message = 'Please add atleast one item';
      }
      this._snackBar.open(message, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }

  reset() {
    this.items = [];
    this.billForm.reset();
    this.finalAmount = 0;
    this.customerData = {} as ICustomer;
    this.billDetails = {} as IBillDetails;
  }

  resetItemsFrom() {
    this.billForm.reset();
  }

  search() {
    const search = this.billForm.get('search')?.value;
    if (search.length > 2) {
      this.filteredItems = this.allItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  getAllItems() {
    this.dbService.getAllItems().subscribe({
      next: (result) => {
        this.allItems = result;
        this.filteredItems = JSON.parse(JSON.stringify(result));
      },
      error: (error) => {
        console.error('Error fetching customers', error);
      },
    });
  }

  selectItem(item: IItem) {
    this.selectedItem = item;
    this.billForm.patchValue(item);
  }

  equal(selectedItem: any, formVal: any) {
    return (
      selectedItem.name === formVal.name &&
      selectedItem.unitPrice === formVal.unitPrice &&
      selectedItem.igstPercentage === formVal.igstPercentage &&
      selectedItem.cgstPercentage === formVal.cgstPercentage 
    );
  }

  back() {
    this.router.navigateByUrl('/home');
  }
}
