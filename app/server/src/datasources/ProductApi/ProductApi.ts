import { DownStreamApi } from "../../common/enums.js";
import { IProduct, IResponseAddProduct, IResponseDeleteProduct, IResponseEditProduct } from "../../common/types";
import { BaseDataSource } from "../base-data-source.js";

// TODO: Figure out how to import using index without using ts-loader and webpack
class ProductApi extends BaseDataSource {

    public async getAllProducts(): Promise<IProduct[]> {
        try {
            const baseURL: string = "http://localhost:5000";
            const productsDownstream: string = DownStreamApi.GetAllProducts;
            return await this.get(`${baseURL}${productsDownstream}`);
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot fetch all products", error)
            throw error;
        }
    }

    public async getProduct(productId: string): Promise<IProduct> {
        try {
            // No need to check for productId because it will throw 404 in downstream anyways.
            const baseURL: string = "http://localhost:5000";
            const getProductDownstream: string = DownStreamApi.GetProduct.replace(':productId', productId);
            return await this.get(`${baseURL}${getProductDownstream}`);
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot fetch product", error)
            throw error;
        }
    }

    public async addProduct(product: IProduct): Promise<IResponseAddProduct> {
        try {
            if(!product) {
                throw new Error('Product is required!')
            }
            const baseURL: string = "http://localhost:5000";
            const addProductDownstream: string = DownStreamApi.AddProduct;
            return await this.post(`${baseURL}${addProductDownstream}`, { body: { product } });
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot add product")
            throw error;
        }
    }

    public async editProduct(productId: string, product: IProduct): Promise<IResponseEditProduct> {
        try {
            // No need to check for productId because it will throw 404 in downstream anyways.
            if(!product) {
                throw new Error('Product is required!')
            }
            const baseURL: string = "http://localhost:5000";
            const editProductDownstream: string = DownStreamApi.EditProduct.replace(':productId', productId);
            return await this.put(`${baseURL}${editProductDownstream}`, { body: { product } });
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot edit product")
            throw error;
        }
    }

    public async deleteProduct(productId: string): Promise<IResponseDeleteProduct> {
        try {
            // No need to check for productId because it will throw 404 in downstream anyways.
            const baseURL: string = "http://localhost:5000";
            const deleteProductDownstream: string = DownStreamApi.DeleteProduct.replace(':productId', productId);
            return await this.delete(`${baseURL}${deleteProductDownstream}`);
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot delete product", error)
            throw error;
        }
    }
}

export default ProductApi;