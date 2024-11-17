import { IResponseDeleteProduct } from '../../common/types';
import { useMutation } from 'react-query';
import { axiosDelete } from '../../hooks/useAxiosInstance/useAxiosInstance';
import { AxiosError } from 'axios';

export interface IUseDeleteProductResponse {
    deleteProductFn: (productId: string) => Promise<IResponseDeleteProduct | void>;
    data?: IResponseDeleteProduct | null;
    error?: AxiosError | null;
    isLoading: boolean;
}

export const useDeleteProduct = (): IUseDeleteProductResponse => {
    const { mutateAsync: deleteProductFn, data, error, isLoading } = useMutation<IResponseDeleteProduct, AxiosError, string>(deleteProduct);

    return {
        deleteProductFn,
        data,
        error,
        isLoading,
    };
};

export const deleteProduct = async (productId: string): Promise<IResponseDeleteProduct> => {
    const response = await axiosDelete<IResponseDeleteProduct>(`http://localhost:5000/products/${productId}`);
    return response.data;
};