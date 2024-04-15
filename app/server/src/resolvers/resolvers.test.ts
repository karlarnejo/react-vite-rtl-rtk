import { Mock } from 'vitest'
import { resolvers } from './resolvers';
import { IGetLimitParams, IGetProductParams, IProduct } from '../common/types';
import { ProductType } from '../common/enums';

const mockGetAllProducts: Mock = vi.fn();
const mockGetProduct: Mock = vi.fn();
const mockAddProduct: Mock = vi.fn();
const mockEditProduct: Mock = vi.fn();
const mockDeleteProduct: Mock = vi.fn();

const mockGetProductApi: IProduct[] = [
    {
        img: "Hello World",
        productId: "Hello World",
        productName: "Hello World",
        productType: ProductType.Breakfast,
        qty: 12345,
        price: { currencyCode: 'PHP', value: 0 }
    },
    {
        img: "Hello World",
        productId: "Hello World",
        productName: "Hello World",
        productType: ProductType.Breakfast,
        qty: 12345,
        price: { currencyCode: 'PHP', value: 0 }
    }
];

const mockGetProductParams: IGetProductParams = {
    productId: '1234'
}

describe('resolvers', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    const mockLimit: IGetLimitParams = { limit: 3 }

    describe('Success queries', () => {
        const dataSources = {
            productApi: {
                getAllProducts: mockGetAllProducts.mockResolvedValue({}),
                getProduct: mockGetProduct.mockResolvedValue({}),
                addProduct: mockAddProduct.mockResolvedValue({}),
                editProduct: mockEditProduct.mockResolvedValue({}),
                deleteProduct: mockDeleteProduct.mockResolvedValue({})
            }   
        };

        it('Query - getAllProducts', async () => {
            await resolvers.Query.getAllProducts(undefined, {page: 1, itemsPerPage: 2}, { dataSources } as any);
            expect(dataSources.productApi.getAllProducts).toHaveBeenCalled();
        });

        it('Query - getProduct', async () => {
            await resolvers.Query.getProduct(undefined, mockGetProductParams, { dataSources } as any);
            expect(dataSources.productApi.getProduct).toHaveBeenCalled();
        });

        it('Mutation - addProduct', async () => {
            await resolvers.Mutation.addProduct(undefined, { product: mockGetProductApi[0] }, { dataSources } as any);
            expect(dataSources.productApi.addProduct).toHaveBeenCalled();
        });

        it('Mutation - editProduct', async () => {
            await resolvers.Mutation.editProduct(undefined, { productId: '12345', product: mockGetProductApi[0] }, { dataSources } as any);
            expect(dataSources.productApi.editProduct).toHaveBeenCalled();
        });

        it('Mutation - deleteProduct', async () => {
            await resolvers.Mutation.deleteProduct(undefined, { productId: '12345' }, { dataSources } as any);
            expect(dataSources.productApi.deleteProduct).toHaveBeenCalled();
        });
    });
});