import { ApolloError, useMutation, MutationFunctionOptions, FetchResult } from "@apollo/client";
import { IResponseDeleteProduct } from "../../common/types";
import { deleteProduct } from "../../data";

export interface IDeleteProductResponse {
    deleteProduct: IResponseDeleteProduct;
};

export interface IUseDeleteProductResponse {
    deleteProductFn: (options?: MutationFunctionOptions) => Promise<FetchResult<IDeleteProductResponse>>;
    data?: IDeleteProductResponse | undefined | null;
    error?: ApolloError;
    loading: boolean;
}

export const useDeleteProduct = (): IUseDeleteProductResponse => {
    const [deleteProductFn, { loading, data, error }] = useMutation<IDeleteProductResponse>(deleteProduct);

    return {
        deleteProductFn, data, error, loading
    }
}