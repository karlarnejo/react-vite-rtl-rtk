export enum AdditionalHeaderKey {
    SAMPLE_ADDITIONAL_HEADER = 'my-additional-header',
    LOGGER_HEADER_UUID = 'logger-header-uuid'
}

export enum DownStreamApi {
    GetAllProducts = 'products',
    GetProduct = '/products/:productId',
    AddProduct = '/users/:userId/products',
    EditProduct = '/users/:userId/products/:productId'
}