export interface IStoreAction {
    type: string;
    payload: any;
}

export interface IFormParams<T> {
    values: T;
    isValid: boolean;
}

export interface IButtonProps {
    name: string;
    label: string;
    onClick: Function;
    variant: 'primary' | 'secondary'
}

export interface IActionButtonProps {
    variant: 'primary' | 'secondary';
    onClick: () => void;
    label: string;
    name: string;
}

export interface IValidationProps {
    value: string
    message: string;
}

export interface IFormValidationsProps {
    name: string;
    message: string;
    expression?: (value: string) => boolean;
}

export interface IActions {
    viewItem: Function;
    editItem?: Function;
    deleteItem?: Function;
}

export interface IProduct {
    img: string;
    productId: string;
    productName: string;
    productType: string;
    qty: number;
    price: string;
    description?: string;
    actions?: IActions
};

export interface IEditProductDetailsFormValues {
    img: string;
    productName: string;
    productType: string;
    qty: string;
    price: string;
    description: string;
}

export interface IAddProductDetailsFormValues {
    productName: string;
    productType: string;
    qty: string;
    price: string;
    description: string;
}

export interface Token {
    id?: string;
    sessionId?: string;
    expires?: number;
    tokenValue: string;
};

export interface IResponseStatus {
    status: string;
};

export interface IResponseDeleteProduct extends IResponseStatus {
    productId: string;
}

export interface IResponseEditProduct extends IResponseStatus {
    productId: string;
}