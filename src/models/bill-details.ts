export interface IBillDetails {
  paymentStatus: false;
  paymentMode: string;
  id?: string;
  invoiceDate: Date;
  billingDate: Date;
  billingAddress: string;
  shippingAddress: string;
  discount: number;
  invoiceType: string;
  billNumber: string;
}
