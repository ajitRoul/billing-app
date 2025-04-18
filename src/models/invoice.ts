import { IBillDetails } from './bill-details';
import { ICustomer } from './customer';
import { IBillItem } from './items';

export interface IInvoice extends IBillDetails {
  customer: ICustomer;
  items: IBillItem[];
  totalAmount: number;
  isPaid?: false;
}

