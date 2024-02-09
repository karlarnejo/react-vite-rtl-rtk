export enum AdditionalHeaderKey {
    SAMPLE_ADDITIONAL_HEADER = 'my-additional-header',
    LOGGER_HEADER_UUID = 'logger-header-uuid'
}

export enum DownStreamApi {
    GetAllProducts = '/products',
    GetProduct = '/products/:productId',
    AddProduct = '/products',
    EditProduct = '/products/:productId',
    DeleteProduct = '/products/:productId',
}

export enum ProductType {
    Room = 'room',
    Breakfast = 'breakfast',
    Lunch = 'lunch',
    Dinner = 'dinner',
    Msc = 'msc'
}