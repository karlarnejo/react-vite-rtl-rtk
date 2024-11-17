import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { IPrice, IResponseEditProduct } from '../../common/types';
import { axiosPatch } from '../../hooks/useAxiosInstance/useAxiosInstance';

export interface IUseEditProductPayload {
    img: string;
    productName: string;
    productType: string;
    qty: number;
    price: IPrice;
    description?: string;
}

export interface IUseEditProductResponse {
    editProductFn: (variables: { productId: string; product: IUseEditProductPayload }) => Promise<IResponseEditProduct | undefined>;
    data?: IResponseEditProduct | undefined | null;
    error?: AxiosError | null;
    isLoading: boolean;
}

export const useEditProduct = (): IUseEditProductResponse => {
    const { mutateAsync: editProductFn, data, error, isLoading } = useMutation<IResponseEditProduct, AxiosError, { productId: string; product: IUseEditProductPayload }>(
        (variables) => editProduct(variables.productId, variables.product)
    );

    return {
        editProductFn,
        data,
        error,
        isLoading,
    };
};

export const editProduct = async (productId: string, product: IUseEditProductPayload): Promise<IResponseEditProduct> => {
    const response = await axiosPatch<IResponseEditProduct>(`http://localhost:5000/products/${productId}`, product);
    return response.data;
};