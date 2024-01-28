import { ApolloError, useQuery } from "@apollo/client";
import { IProduct } from "../../common/types";
import { getProduct } from "../../data";

export interface IUseGetProductParams {
    productId: string;
}

export interface IGetProductResponse {
    getProduct: IProduct;
};

export interface IUseGetProductResponse {
    data?: IGetProductResponse;
    error?: ApolloError;
    loading: boolean;
}

export const useGetProduct = ({ productId }: IUseGetProductParams): IUseGetProductResponse => {
    const { loading, data, error } = useQuery<IGetProductResponse>(getProduct, {
        variables: { productId }
    });

    return {
        // data, error, loading
        data, error, loading
    }
};