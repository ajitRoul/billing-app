import { NgModule } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { CUSTOMER_TABLE_SCHEMA, BILL_TABLE_SCHEMA, USER_TABLE_SCHEMA, ITEMS_TABLE_SCHEMA, BILL_ITEMS_TABLE_SCHEMA } from './db.tables';

const dbConfig: DBConfig  = {
  name: 'BILLING_DB',
  version: 1,
  objectStoresMeta: [
    CUSTOMER_TABLE_SCHEMA,
    BILL_TABLE_SCHEMA,
    USER_TABLE_SCHEMA,
    ITEMS_TABLE_SCHEMA,
    BILL_ITEMS_TABLE_SCHEMA,
    
  ]
};


@NgModule({
  declarations: [],
  imports: [
    NgxIndexedDBModule.forRoot(dbConfig)
  ]
})
export class DbModule { }
