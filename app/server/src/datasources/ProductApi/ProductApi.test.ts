import { dataSources } from "..";
import { AdditionalHeaderKey } from "../../common/enums";
import { IDataSourceContext, IProducts, IRequestContext } from "../../common/types";
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
]

const mockGet = vi.fn().mockResolvedValue(mockGetProductApi);
vi.mock("@apollo/datasource-rest", () => {
    class MockRESTDataSource {
        get = mockGet;
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

    describe('ProductApi data source success', () => {
        it('should call product api and return its data', async () => {
            expect(sourceProductApi).toBeTruthy();
            await sourceProductApi.getAllProducts();
            expect(mockGet).toHaveBeenCalledWith('product-list');
        });
    });

    describe('ProductApi data source error', () => {
        it('should call product api and return an error', async () => {
            mockGet.mockImplementation(vi.fn().mockRejectedValue('error'));

            try {
                const productApi: ProductApi = new ProductApi(mockContext);
                await productApi.getAllProducts();
            } catch (error) {
                expect(error).toBe('error');
            }

        });
    });
})