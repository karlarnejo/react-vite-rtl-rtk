import { RESTDataSource } from "@apollo/datasource-rest";
// TODO: Figure out how to import using index without using ts-loader and webpack
class ProductApi extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = "http://localhost:5000/";
    }
    async getAllProducts() {
        try {
            const productsDownstream = "product-list";
            return await this.get(productsDownstream);
        }
        catch (error) {
            //TODO: Add logger
            console.log("Error: Cannot fetch all products", error);
            throw error;
        }
    }
}
export default ProductApi;
