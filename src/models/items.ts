export interface IItem {
    name: string;
    unitPrice: number;
    igstPercentage: number;
    cgstPercentage: number;
    sellingPrice: number;
    id?: number;
}

export interface IBillItem extends IItem{
    quantity: number;
    IGSTtaxAmount: number;
    CGSTtaxAmount: number;
}