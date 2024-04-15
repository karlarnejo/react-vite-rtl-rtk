import { ApolloError, useQuery } from '@apollo/client';
import { IBasePaginatedResponse, IProduct } from '../../common/types';
import { getAllProducts } from '../../data';

export interface IGetAllProductsResponse {
    getAllProducts: IBasePaginatedResponse<IProduct[]>;
}

export interface IUseGetAllProductsResponse {
    fetchMore: any;
    data: IGetAllProductsResponse;
    error?: ApolloError;
    loading: boolean;
}

export const useGetAllProducts = (page: number, itemsPerPage: number) => {
    const { fetchMore, loading, data, error } = useQuery<IGetAllProductsResponse>(getAllProducts, {
        variables: {
            page,
            itemsPerPage
        },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true
    });

    return {
        fetchMore,
        data: { getAllProducts: (data && data.getAllProducts) ?? { data: [], totalItems: 0, totalPages: 0 } },
        error,
        loading
    };
};
