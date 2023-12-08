import getAllProducts from './endpoints/v1/products/get-all-products/index.js';

export const apis = () => {
    return [
        {
            ...getAllProducts
        }
    ]
}