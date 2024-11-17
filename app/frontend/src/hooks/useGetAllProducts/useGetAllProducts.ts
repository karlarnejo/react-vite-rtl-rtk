import { IBasePaginatedResponse, IProduct } from '../../common/types';
import { axiosGet } from '../../hooks/useAxiosInstance/useAxiosInstance';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export interface IUseGetAllProductsResponse {
    data?: IBasePaginatedResponse<IProduct[]>;
    error?: AxiosError;
    isLoading: boolean;
    refetch: () => void;
}

export const useGetAllProducts = (page: number, itemsPerPage: number) => {
    const { data, error, isLoading } = useQuery<IBasePaginatedResponse<IProduct[]>, AxiosError>(
        ['getAllProducts', page, itemsPerPage],
        () => getAllProducts(page, itemsPerPage),
        // isLoading is not triggered if true. Ideal for infinite scroll. Use isFetching to track loading with keepPreviousData
        // {
        //     keepPreviousData: true
        // }
    );

    return {
        data: data ?? { data: [], totalItems: 0, totalPages: 0 },
        error,      
        isLoading
    };
};

export const getAllProducts = async (page: number, itemsPerPage: number): Promise<IBasePaginatedResponse<IProduct[]>> => {
    const response = await axiosGet<IBasePaginatedResponse<IProduct[]>>(
        'http://localhost:5000/products',
        { page, itemsPerPage }
    );
    return response.data;
};
