import { RESTDataSource } from "@apollo/datasource-rest";
import { IProducts } from "../../common/types";

// TODO: Figure out how to import using index without using ts-loader and webpack
class ProductApi extends RESTDataSource {
    override baseURL = "http://localhost:5000/";

    public async getAllProducts(): Promise<IProducts[]> {
        try {
            const productsDownstream: string = "product-list";
            return await this.get(productsDownstream);
        } catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot fetch all products", error)
            throw error;
        }
    }
}

export default ProductApi;