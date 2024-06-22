export interface IItem {
    name: string;
    unitPrice: number;
    taxPercentage: number;
    sellingPrice: number;
    id?: number;
}

export interface IBillItem extends IItem{
    quantity: number;
    taxAmount: number;
}