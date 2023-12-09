import getAllProducts from './endpoints/v1/products/get-all-products/index.js';
import getProduct from './endpoints/v1/products/get-product/index.js';
import createProduct from './endpoints/v1/products/create-product/index.js';
import editProduct from './endpoints/v1/products/edit-product/index.js';

export const apis = () => {
    return [
        getAllProducts,
        getProduct,
        createProduct,
        editProduct
    ]
}