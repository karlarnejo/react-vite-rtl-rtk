import { AxiosError } from 'axios';
import { IProduct } from '../../common/types';
import { axiosGet } from '../../hooks/useAxiosInstance/useAxiosInstance';
import { useQuery } from 'react-query';

export interface IUseGetProductParams {
    productId: string;
}

export interface IUseGetProductResponse {
    data?: IProduct;
    error?: AxiosError | null;
    isLoading: boolean;
}

export const useGetProduct = ({ productId }: IUseGetProductParams): IUseGetProductResponse => {
    const { isLoading, data, error } = useQuery<IProduct, AxiosError>(
        ["getProduct", productId],
        () => retrieveProduct(productId),
        {
            enabled: !!productId,
        }
    );

    return {
        data,
        error,
        isLoading
    };
};

export const retrieveProduct = async (productId: string) => {
    const response = await axiosGet<IProduct>(`http://localhost:5000/products/${productId}`);
    return response.data;
};
