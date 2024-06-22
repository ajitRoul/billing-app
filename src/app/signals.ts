import { signal } from '@angular/core';
import { IUser } from '../models/user';
import { ICustomer } from '../models/customer';
import { IBillDetails } from '../models/bill-details';

export const INVOICE_INITIAL_STATE: any = {
  user: {},
  customer: {},
  items: [],
  totalAmount: 0,
  billDetails: {}
};

// Create a signal instance

export const USER_INITIAL_STATE: IUser = {
  name: '',
  email: '',
  phone: '',
  GSTIN: '',
  companyName: '',
  address: '',
  bankName: '',
  accountNo: '',
  ifscCode: '',
  branchName: '',
  upiId: '',
};

export const CUSTOMER_INITIAL_STATE: ICustomer = {
  name: '',
  email: '',
  phone: '',
  GSTIN: '',
  companyName: '',
  address: '',
};

export const BILL_DETAILS_INITIAL_STATE: IBillDetails = {
  paymentStatus: false,
  paymentMode: 'Others',
  invoiceDate: new Date(),
  billingDate: new Date(),
  billingAddress: '',
  shippingAddress: '',
  discount: 0,
  invoiceType: 'TAX INVOICE',
};

export const USER_SIGNAL = signal(USER_INITIAL_STATE);
export const CUSTOMER_SIGNAL = signal(CUSTOMER_INITIAL_STATE);
export const BILL_DETAILS_SIGNAL = signal(BILL_DETAILS_INITIAL_STATE);

export const INVOICE_SIGNAL = signal(INVOICE_INITIAL_STATE);
