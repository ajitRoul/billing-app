import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { IUser } from '../../models/user';
import { BILL_ITEMS_TABLE_SCHEMA, BILL_TABLE_SCHEMA, CUSTOMER_TABLE_SCHEMA, ITEMS_TABLE_SCHEMA, USER_TABLE_SCHEMA } from './db.tables';
import { Observable } from 'rxjs';
import { ICustomer } from '../../models/customer';
import { IItem } from '../../models/items';
import { IInvoice } from '../../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  
  
  
  

  constructor(private dbService: NgxIndexedDBService){}

  addUser(user: IUser): Observable<any> { 
   const userData = {...user, creationDate: new Date(), lastUpdated: new Date(),isActive: true};
    return this.dbService.add(USER_TABLE_SCHEMA.store, userData);
  }

  getUser(): Observable<IUser[]> {
    return this.dbService.getAll(USER_TABLE_SCHEMA.store);
  }

  updateUser(user: IUser): Observable<any> {
    const userData = {...user, lastUpdated: new Date()};
    return this.dbService.update(USER_TABLE_SCHEMA.store, userData);
  }

  addCustomer(customer: ICustomer): Observable<any> {
    const customerData = {...customer, creationDate: new Date(), lastUpdated: new Date(),isActive: true};
    return this.dbService.add(CUSTOMER_TABLE_SCHEMA.store, customerData);
  }
  
  getAllCustomers(): Observable<ICustomer[]> {
    return this.dbService.getAll(CUSTOMER_TABLE_SCHEMA.store);
  }
  getCustomerById(id: number): Observable<ICustomer> {
    return this.dbService.getByKey(CUSTOMER_TABLE_SCHEMA.store, id);
  }
  getCustomerByMobile(mobile: string): Observable<ICustomer[]> {
    return this.dbService.getAllByIndex(CUSTOMER_TABLE_SCHEMA.store, 'phone',  IDBKeyRange.only(mobile));
  }
  updateCustomer(customer: ICustomer): Observable<any> {
    const customerData = {...customer, lastUpdated: new Date()};
    return this.dbService.update(CUSTOMER_TABLE_SCHEMA.store, customerData);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.dbService.delete(CUSTOMER_TABLE_SCHEMA.store, id);
  }

  addItems(items: IItem): Observable<any> {
    const itemData = {...items, creationDate: new Date(), lastUpdated: new Date(),isActive: true};
    return this.dbService.add(ITEMS_TABLE_SCHEMA.store, itemData);
  }
  getAllItems(): Observable<IItem[]> {
    return this.dbService.getAll(ITEMS_TABLE_SCHEMA.store);
  }
  getItemByName(name: string): Observable<IItem[]> {
    return this.dbService.getAllByIndex(ITEMS_TABLE_SCHEMA.store, 'name', IDBKeyRange.only(name));
  }
  updateItems(selectedItem: IItem): Observable<any> {
    const itemData = {...selectedItem, lastUpdated: new Date()};
    return this.dbService.update(ITEMS_TABLE_SCHEMA.store, itemData);
  }

  updateInvoice(invoice: IInvoice):  Observable<any> {
    return this.dbService.update(BILL_TABLE_SCHEMA.store, invoice);
  }
  saveInvoice(invoice: IInvoice) {
    return this.dbService.add(BILL_TABLE_SCHEMA.store, invoice);
  }
  getAllInvoices(): Observable<IInvoice[]> {
    return this.dbService.getAll(BILL_TABLE_SCHEMA.store);
  }
  deleteInvoice(invoiceId: number): Observable<any> {
    return this.dbService.delete(BILL_TABLE_SCHEMA.store, invoiceId);
  }

}
