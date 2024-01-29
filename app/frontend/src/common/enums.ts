export enum ApplicationRoutes {
    EverythingElse = '*',
    Home = '/',
    Sample = '/sample',
    Login = '/login',
    Products = '/products',
    ProductDetail = '/product-detail',
    EditProductDetail = '/edit-product-detail',
    AddProduct = '/add-product'
}

export enum ProductNotifications {
    successAdd = 'Successfully added product',
    errorAdd = 'There is an error adding the product.',
    successDelete = 'Successfully deleted product',
    errorDelete = 'There is an error deleting the product.',
    successEdit = 'Successfully edited product',
    errorEdit = 'There is an error editing the product.',
    tryAgain = 'Please contact the administrator and try again later.'
}
