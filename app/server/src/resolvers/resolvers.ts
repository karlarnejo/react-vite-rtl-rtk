import { IAddProductParams, IBasePaginatedResponse, IDeleteProductParams, IEditProductParams, IGetProductParams, IProductPaginationParams, IProduct, IResponseAddProduct, IResponseDeleteProduct, IResponseEditProduct } from "../common/types";
import { IDataSources } from "../datasources";

// TODO: Figure out how to import using index without using ts-loader and webpack
export const resolvers = {
    Query: {
        getAllProducts: async (
            _: any,
            { page, itemsPerPage }: IProductPaginationParams,
            { dataSources }: { dataSources: IDataSources }
        ): Promise<IBasePaginatedResponse<IProduct[]>> => {
            return dataSources.productApi.getAllProducts(page, itemsPerPage);
        },
        getProduct: async (
            _: any,
            { productId }: IGetProductParams,
            { dataSources }: { dataSources: IDataSources }
        ): Promise<IProduct> => {
            return dataSources.productApi.getProduct(productId);
        }
    },
    Mutation: {
        addProduct: async (
            _: any,
            { product }: IAddProductParams,
            { dataSources }: { dataSources: IDataSources }
        ): Promise<IResponseAddProduct> => {
            return dataSources.productApi.addProduct(product);
        },
        editProduct: async (
            _: any,
            { productId, product }: IEditProductParams,
            { dataSources }: { dataSources: IDataSources }
        ): Promise<IResponseEditProduct> => {
            return dataSources.productApi.editProduct(productId, product);
        },
        deleteProduct: async (
            _: any,
            { productId }: IDeleteProductParams,
            { dataSources }: { dataSources: IDataSources }
        ): Promise<IResponseDeleteProduct> => {
            return dataSources.productApi.deleteProduct(productId);
        }
    }
  };