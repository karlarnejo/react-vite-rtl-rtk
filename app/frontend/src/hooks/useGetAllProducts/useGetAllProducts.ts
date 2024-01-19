import { ApolloError, useQuery } from "@apollo/client";
import { IProduct } from "../../common/types";
import { getAllProducts } from "../../data";

export interface IGetAllProductsResponse {
    getAllProducts: IProduct[];
};

export interface IUseGetAllProductsResponse {
    data: IGetAllProductsResponse;
    error?: ApolloError;
    loading: boolean;
}

export const useGetAllProducts = (): IUseGetAllProductsResponse => {
    const { loading, data, error } = useQuery<IGetAllProductsResponse>(getAllProducts);

    return {
        // data, error, loading
        data: { getAllProducts: (data && data.getAllProducts) ?? [] }, error, loading
    }
};