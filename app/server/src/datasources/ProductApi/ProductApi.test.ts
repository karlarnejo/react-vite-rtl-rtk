import { dataSources } from "..";
import { AdditionalHeaderKey } from "../../common/enums";
import { IDataSourceContext, IProducts, IRequestContext, IResponseDeleteProduct } from "../../common/types";
import ProductApi from "./ProductApi";

const mockGetProductApi: IProducts[] = [
    {
        productName: "Hello World",
        description: "Hello World"
    },
    {
        productName: "Hello World",
        description: "Hello World"
    }
];

const mockGet = vi.fn().mockResolvedValue(mockGetProductApi);
const mockEdit = vi.fn();
const mockDelete = vi.fn();
const mockAdd = vi.fn()
vi.mock("@apollo/datasource-rest", () => {
    class MockRESTDataSource {
        get = mockGet;
        put = mockEdit;
        delete = mockDelete;
        post = mockAdd;
        context = ({
            headers: {
                [AdditionalHeaderKey.SAMPLE_ADDITIONAL_HEADER]: '12345'
            }
        } as unknown) as IRequestContext;
    }

    return {
        RESTDataSource: MockRESTDataSource
    };
});

const mockContextValue: IRequestContext = {
    headers: { 'my-additional-header': '12345', authorization: 'testAuth' },
    datasources: dataSources({})
};

const mockContext: IDataSourceContext = {
    contextValue: mockContextValue
} as IDataSourceContext;

describe("ProductApi", () => {
    const sourceProductApi: ProductApi = new ProductApi(mockContext);

    describe('getAllProducts source success', () => {
        it('should call getAllProducts api and return its data', async () => {
            expect(sourceProductApi).toBeTruthy();
            await sourceProductApi.getAllProducts();
            expect(mockGet).toHaveBeenCalledWith('products');
        });
    });

    describe('getAllProducts source error', () => {
        it('should call getAllProducts api and return an error', async () => {
            mockGet.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.getAllProducts();
            } catch (error) {
                expect(error).toBe('error');
            }

        });
    });

    describe('getProduct source success', () => {
        it('should call getProduct api and return its data', async () => {
            mockGet.mockResolvedValue(mockGetProductApi[0]);

            expect(sourceProductApi).toBeTruthy();
            const product: IProducts = await sourceProductApi.getProduct('12345');
            expect(product).toEqual({
                productName: "Hello World",
                description: "Hello World"
            })
            expect(mockGet).toHaveBeenCalledWith('/products/12345');
        });
    })

    describe('getProduct source error', () => {
        it('should call getProduct api and return an error', async () => {
            mockGet.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.getProduct('12345');
            } catch (error) {
                expect(error).toBe('error');
            }

        });
    });

    describe('addProduct source success', () => {
        it('should call addProduct api and return its data', async () => {
            expect(sourceProductApi).toBeTruthy();
            await sourceProductApi.addProduct('12345', mockGetProductApi[0]);
            expect(mockAdd).toHaveBeenCalledWith('/users/12345/products', {
                body: { 
                    product: {
                        productName: "Hello World",
                        description: "Hello World"
                    }
                }
            })
        });
    });

    describe('addProduct source error', () => {
        it('should call addProduct api and return an error', async () => {
            mockAdd.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.addProduct('12345', mockGetProductApi[0]);
            } catch (error) {
                expect(error).toBe('error');
            }
        });

        it('should call addProduct api and return a required error', async () => {
            mockAdd.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.addProduct('12345', undefined);
            } catch (error) {
                expect(error).toEqual(Error('Product is required!'));
            }
        });
    });

    describe('editProduct source success', () => {
        it('should call editProduct api and return its data', async () => {
            expect(sourceProductApi).toBeTruthy();
            await sourceProductApi.editProduct('123', '12345', mockGetProductApi[0]);
            expect(mockEdit).toHaveBeenCalledWith('/users/123/products/12345', {
                body: { 
                    product: {
                        productName: "Hello World",
                        description: "Hello World"
                    }
                }
            })
        });
    });

    describe('editProduct source error', () => {
        it('should call editProduct api and return an error', async () => {
            mockEdit.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.editProduct('123', '12345', mockGetProductApi[0]);
            } catch (error) {
                expect(error).toBe('error');
            }
        });

        it('should call editProduct api and return a required error', async () => {
            mockEdit.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.editProduct('123', '12345', undefined);
            } catch (error) {
                expect(error).toEqual(Error('Product is required!'));
            }
        });
    });

    describe('deleteProduct source success', () => {
        it('should call deleteProduct api and return its data', async () => {
            mockDelete.mockResolvedValue({ productId: '12345' });

            expect(sourceProductApi).toBeTruthy();
            const productId: IResponseDeleteProduct = await sourceProductApi.deleteProduct('12345');
            expect(productId).toEqual({
                productId: '12345'
            })
            expect(mockDelete).toHaveBeenCalledWith('/products/12345');
        });
    })

    describe('deleteProduct source error', () => {
        it('should call deleteProduct api and return an error', async () => {
            mockDelete.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.deleteProduct('12345');
            } catch (error) {
                expect(error).toBe('error');
            }
        });
    });
})