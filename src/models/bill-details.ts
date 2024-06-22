export interface IBillDetails {
  paymentStatus: false;
  paymentMode: string;
  id?: number;
  invoiceDate: Date;
  billingDate: Date;
  billingAddress: string;
  shippingAddress: string;
  discount: number;
  invoiceType: string;

}
