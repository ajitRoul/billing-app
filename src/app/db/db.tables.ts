export const CUSTOMER_TABLE_SCHEMA = {
    store: 'CUSTOMER',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'phone', keypath: 'phone', options: { unique: true } },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'GSTN', keypath: 'gstn', options: { unique: true } },
        { name: 'companyName', keypath: 'companyName', options: { unique: true } },
        { name: 'address', keypath: 'address', options: { unique: false } },
        { name: 'creationDate', keypath: 'creationDate', options: { unique: false, defaultValue: new Date() } },
        { name: 'lastUpdated', keypath: 'lastUpdated', options: { unique: false,defaultValue: new Date() } },
        { name: 'isActive', keypath: 'isActive', options: {unique: false, defaultValue: false}}
    ]
}

export const BILL_TABLE_SCHEMA = {
    store: 'BILL',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
        { name: 'billNumber', keypath: 'billNumber', options: { unique: true } },
        { name: 'invoiceDate', keypath: 'invoiceDate', options: { unique: false } },
        { name: 'billingDate', keypath: 'billingDate', options: { unique: false } },
        { name: 'paymentMode', keypath: 'paymentMode', options: { unique: false } },
        { name: 'paymentStatus', keypath: 'paymentStatus', options: { unique: false } },
        { name: 'billingAddress', keypath: 'billingAddress', options: { unique: false } },
        { name: 'shippingAddress', keypath: 'shippingAddress', options: { unique: false } },
        { name: 'creationDate', keypath: 'creationDate', options: { unique: false } },
        { name: 'lastUpdated', keypath: 'lastUpdated', options: { unique: false, defaultValue: new Date() } },
        { name: 'isActive', keypath: 'isActive', options: {unique: false, defaultValue: true}}
    ]
}

export const USER_TABLE_SCHEMA = {
    store: 'USER',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'phone', keypath: 'phone', options: { unique: true } },
        { name: 'GSTIN', keypath: 'GSTIN', options: { unique: true } },
        { name: 'companyName', keypath: 'companyName', options: { unique: true } },
        { name: 'address', keypath: 'address', options: { unique: true } },
        { name: 'bankName', keypath: 'bankName', options: { unique: true } },
        { name: 'accountNo', keypath: 'accountNo', options: { unique: true } },
        { name: 'ifscCode', keypath: 'ifscCode', options: { unique: true } },
        { name: 'branchName', keypath: 'branchName', options: { unique: true } },
        { name: 'creationDate', keypath: 'creationDate', options: { unique: false, defaultValue: new Date() } },
        { name: 'lastUpdated', keypath: 'lastUpdated', options: { unique: false,defaultValue: new Date() } },
        { name: 'isActive', keypath: 'isActive', options: {unique: false, defaultValue: false}}
    ]
}

export const ITEMS_TABLE_SCHEMA = {
    store: 'ITEM',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } },
        { name: 'unitPrice', keypath: 'unitPrice', options: { unique: false } },
        { name: 'taxPercentage', keypath: 'taxPercentage', options: { unique: false } },
        { name: 'creationDate', keypath: 'creationDate', options: { unique: false, defaultValue: new Date() } },
        { name: 'lastUpdated', keypath: 'lastUpdated', options: { unique: false,defaultValue: new Date() } },
        { name: 'isActive', keypath: 'isActive', options: {unique: false, defaultValue: false}}
    ]
}

export const BILL_ITEMS_TABLE_SCHEMA = {
    store: 'BILL_ITEM',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
        { name: 'billId', keypath: 'billId', options: { unique: false } },
        { name: 'itemId', keypath: 'itemId', options: { unique: false } },
        { name: 'quantity', keypath: 'quantity', options: { unique: false } },
        { name: 'creationDate', keypath: 'creationDate', options: { unique: false, defaultValue: new Date() } },
        { name: 'lastUpdated', keypath: 'lastUpdated', options: { unique: false,defaultValue: new Date() } },
        { name: 'isActive', keypath: 'isActive', options: {unique: false, defaultValue: false}}
    ]
}

