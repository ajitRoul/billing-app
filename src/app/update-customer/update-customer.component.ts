import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomer } from '../../models/customer';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DbService } from '../db/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.scss',
})
export class UpdateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  filteredCustomers!: ICustomer[];

  constructor(
    private readonly dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ICustomer,
    private readonly dbService: DbService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: [this.dialogData?.name, [Validators.required]],
      email: [this.dialogData?.email, [Validators.email]],
      phone: [
        this.dialogData?.phone,
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      GSTIN: this.dialogData?.GSTIN,
      companyName: this.dialogData?.companyName,
      address: this.dialogData?.address,
      search: '',
    });
  }

  addCustomer() {
    if (this.customerForm.valid) {
      const frmVal = this.customerForm.value;
      let service = this.dbService.addCustomer(frmVal);
      if (this.dialogData.id) {
        const isEqual = this.equal(frmVal, this.dialogData);
        if (isEqual) {
          this.dialogRef.close(this.dialogData);
          return;
        }
        const data = { ...this.dialogData, ...frmVal };
        service = this.dbService.updateCustomer(data);
      }
      service.subscribe({
        next: (result) => {
          this.dialogRef.close(result);
          console.log('Customer added successfully', result);
        },
        error: (error) => {
          console.error('Error adding customer', error);
        },
      });
    }
  }

  search() {
    const search = this.customerForm.get('search')?.value;
    if (search) {
      this.dbService
        .getCustomerByMobile(this.customerForm.get('search')?.value)
        .subscribe({
          next: (result) => {
            this.filteredCustomers = result;
          },
          error: (error) => {
            console.error('Error fetching customers', error);
          },
        });
    }
  }

  selectItem(customer: ICustomer) {
    this.dialogData = customer;
    this.customerForm.patchValue(customer);
    this.filteredCustomers = [];
  }

  equal(obj1: any, obj2: any) {
    return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
  }
}
