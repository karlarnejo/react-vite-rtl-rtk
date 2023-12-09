import { DownStreamApi } from "../../common/enums.js";
import { IProducts, IResponseAddProduct, IResponseEditProduct } from "../../common/types";
import { BaseDataSource } from "../base-data-source.js";
import { ApolloError } from "apollo-server-express";

// TODO: Figure out how to import using index without using ts-loader and webpack
class ProductApi extends BaseDataSource {
    override baseURL = "http://localhost:5000/";

    public async getAllProducts(): Promise<IProducts[]> {
        try {
            const productsDownstream: string = DownStreamApi.GetAllProducts;
            return await this.get(productsDownstream);
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot fetch all products", error)
            throw error;
        }
    }

    public async getProduct(productId: string): Promise<IProducts[]> {
        try {
            const productDownstream: string = DownStreamApi.GetProduct.replace(':productId', productId);
            return await this.get(productDownstream);
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot fetch product", error)
            throw error;
        }
    }

    public async addProduct(userId: string, product: IProducts): Promise<IResponseAddProduct> {
        try {
            if(!product) {
                throw new Error('Product is required!')
            }
            const addProductDownstream: string = DownStreamApi.AddProduct.replace(':userId', userId);
            return await this.post(addProductDownstream, { body: { product } });
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot add product")
            throw error;
        }
    }

    public async editProduct(userId: string, productId: string, product: IProducts): Promise<IResponseEditProduct> {
        try {
            if(!product) {
                throw new Error('Product is required!')
            }
            const editProductDownstream: string = DownStreamApi.EditProduct.replace(':userId', userId).replace(':productId', productId);
            return await this.put(editProductDownstream, { body: { product } });
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot edit product")
            throw error;
        }
    }
}

export default ProductApi;