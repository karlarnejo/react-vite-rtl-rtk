import { IAddProduct, IResponseAddProduct } from '../../common/types';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { axiosPost } from '../../hooks/useAxiosInstance/useAxiosInstance';


export interface IUseAddProductResponse {
    addProductFn: (product: IAddProduct) => Promise<IResponseAddProduct | undefined>;
    data?: IResponseAddProduct | undefined | null;
    error?: AxiosError | null;
    isLoading: boolean;
}

export const useAddProduct = (): IUseAddProductResponse => {
    const { mutateAsync: addProductFn, data, error, isLoading } = useMutation<IResponseAddProduct, AxiosError, IAddProduct>(
        (product) => addProduct(product)
    );

    return {
        addProductFn,
        data,
        error,
        isLoading,
    };
};

export const addProduct = async (product: IAddProduct): Promise<IResponseAddProduct> => {
    const response = await axiosPost<IResponseAddProduct>('http://localhost:5000/products', product);
    return response.data;
};
