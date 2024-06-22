import { Component, Inject, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../shared/shared.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IBillDetails } from '../../models/bill-details';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UtilService } from '../shared/util.service';
import { CUSTOMER_SIGNAL } from '../signals';
import { ICustomer } from '../../models/customer';

@Component({
  selector: 'app-update-bill-details',
  standalone: true,
  imports: [SharedModule,FormsModule,ReactiveFormsModule, MatDatepickerModule, MatSelectModule, MatSlideToggleModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './update-bill-details.component.html',
  styleUrl: './update-bill-details.component.scss'
})
export class UpdateBillDetailsComponent implements OnInit{
  billForm!: FormGroup;
  paymentModes: string[] = ['Cash', 'Card', 'Net Banking', 'UPI', 'Others'];
  customerData!: ICustomer;

  constructor(
    private readonly dialogRef:  MatDialogRef<UpdateBillDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public billDetails: IBillDetails,
    private readonly formBuilder: FormBuilder,
    private readonly util: UtilService
  ) {}

  ngOnInit(): void {
    const state = CUSTOMER_SIGNAL();
    this.customerData = state;
    console.log(this.customerData);
    this.billForm = this.formBuilder.group({
      billNumber: [{value: this.billDetails?.id?this.billDetails?.id : this.util.getBillNumber(), disabled: true},[Validators.required]],
      invoiceDate: [this.billDetails?.invoiceDate? this.billDetails?.invoiceDate : new Date(),[Validators.required]],
      billingDate: [this.billDetails?.billingDate? this.billDetails?.billingDate : new Date(),[Validators.required]],
      paymentMode: this.billDetails?.paymentMode? this.billDetails?.paymentMode : 'Cash',
      paymentStatus: this.billDetails?.paymentStatus? this.billDetails?.paymentStatus : false,
      billingAddress: this.billDetails?.billingAddress?(this.billDetails?.billingAddress): (this.customerData?.address),
      shippingAddress: this.billDetails?.shippingAddress,
      invoiceType: this.billDetails?.invoiceType? this.billDetails?.invoiceType : 'Tax invoice',
    });
  }


  addBillDetails() {
    if(this.billForm.valid) {
      const billNumber = this.util.getBillNumber();
      const billDetails = this.billForm.value;
      billDetails.billNumber = billNumber;
      this.dialogRef.close(billDetails);
    }
  }

  
}
