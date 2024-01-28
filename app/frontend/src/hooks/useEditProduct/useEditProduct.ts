import { ApolloError, useMutation, MutationFunctionOptions, FetchResult } from "@apollo/client";
import { IResponseEditProduct } from "../../common/types";
import { editProduct } from "../../data";

export interface IEditProductResponse {
    editProduct: IResponseEditProduct;
};

export interface IUseEditProductResponse {
    editProductFn: (options?: MutationFunctionOptions) => Promise<FetchResult<IEditProductResponse>>;
    data?: IEditProductResponse | undefined | null;
    error?: ApolloError;
    loading: boolean;
}

export const useEditProduct = (): IUseEditProductResponse => {
    const [editProductFn, { loading, data, error }] = useMutation<IEditProductResponse>(editProduct);

    return {
        editProductFn, data, error, loading
    }
}