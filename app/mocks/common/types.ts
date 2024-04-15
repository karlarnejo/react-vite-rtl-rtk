export interface IPrice {
    currencyCode: string;
    value: number;
}

export interface IProduct {
    img: string;
    productId: string;
    productName: string;
    productType: string;
    qty: number;
    price: IPrice;
    description?: string;
}

export interface IBasePaginatedResponse<T> {
    data: T;
    totalPages: number;
    totalItems: number;
}