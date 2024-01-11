export interface IStoreAction {
    type: string;
    payload: any;
}

export interface IFormParams<T> {
    values: T;
    isValid: boolean;
}

export interface IButtonProps {
    className?: string;
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
    editItem: Function;
    deleteItem: Function;
}

export interface IProductData {
    img: string;
    productId: string;
    productName: string;
    productType: string;
    availability: string;
    qty: number;
    price: string;
    actions: IActions
};