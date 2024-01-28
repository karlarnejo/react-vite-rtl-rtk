import { ApolloError, useMutation, MutationFunctionOptions, FetchResult } from "@apollo/client";
import { IResponseAddProduct } from "../../common/types";
import { addProduct } from "../../data";

export interface IAddProductResponse {
    addProduct: IResponseAddProduct;
};

export interface IUseAddProductResponse {
    addProductFn: (options?: MutationFunctionOptions) => Promise<FetchResult<IAddProductResponse>>;
    data?: IAddProductResponse | undefined | null;
    error?: ApolloError;
    loading: boolean;
}

export const useAddProduct = (): IUseAddProductResponse => {
    const [addProductFn, { loading, data, error }] = useMutation<IAddProductResponse>(addProduct);

    return {
        addProductFn, data, error, loading
    }
}