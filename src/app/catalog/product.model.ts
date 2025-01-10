export interface IProduct {
    id: number;
    description: string;
    name: string;
    imageName: string;
    category: string;
    price: number;
    discount: number;
}

export interface ILineItem {
    product: IProduct;
    qty: number;
}