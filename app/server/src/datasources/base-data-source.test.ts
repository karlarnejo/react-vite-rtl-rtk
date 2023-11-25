import { IDataSources, dataSources } from ".";
import { IRequestContext } from "../common/types";
import ProductApi from "./ProductApi/ProductApi";
import { BaseDataSource } from "./base-data-source";

const mockDataSources: IDataSources = {
    productApi: ({ getAllProducts: vi.fn() } as unknown) as ProductApi
} as IDataSources;

const mockDefaultContext: IRequestContext = {
    headers: {
        'my-additional-header': 'test-my-additional-header'
    },
    datasources: mockDataSources
};

let mockContext = { ...mockDefaultContext }

vi.mock('@apollo/datasource-rest', () => {
    class MockRESTDataSource {
        baseUrl = '';
        get = vi.fn();
        contextValue = mockContext;
    }

    return {
        RESTDataSource: MockRESTDataSource
    };
});

describe('base-data-source', () => {
    const mockHeader = {
        Authorization: 'Bearer mockToken',
        'Content-Type': 'application/json',
        'my-additional-header': 'test-my-additional-header'
    };

    const callWillSendRequest = async (dataSource: BaseDataSource): Promise<void> => {
        await dataSource.willSendRequest('http://test/url', {
            method: 'GET',
            params: new URLSearchParams(),
            headers: mockHeader as any
        });
    };

    describe('base data source with context', () => {
        beforeAll(() => {
            mockContext = { ...mockDefaultContext }
        });

        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should instantiate datasource and set headers', async () => {
            const dataSource = new BaseDataSource({ contextValue: mockContext });
            expect(dataSource).toBeTruthy();

            await callWillSendRequest(dataSource);
            expect(mockHeader).toEqual({
                Authorization: 'Bearer mockToken',
                'Content-Type': 'application/json',
                'my-additional-header': 'test-my-additional-header'
            });
        });
    });
    describe('base data source without context', () => {
        beforeAll(() => {
            mockContext = { ...mockDefaultContext };
        });
        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should throw an error', async () => {
            const dataSource = new BaseDataSource({});
            try {
                await callWillSendRequest(dataSource);
            } catch (error) {
                expect((error as Error).message).toBe('Request context not available');
            }
        });
    });
    describe('base data source with partial auth only context', () => {
        beforeAll(() => {
            mockContext = {
                headers: { Authorization: 'Bearer mockToken', 'Content-Type': 'application/json' },
                datasources: mockDataSources
            }
        });

        afterAll(() => {
            vi.resetAllMocks();
        })

        it('should instantiate data and set headers', async () => {
            const dataSource = new BaseDataSource({ contextValue: mockContext });
            expect(dataSource).toBeTruthy();
            await callWillSendRequest(dataSource);
            expect(mockHeader).toEqual({
                Authorization: 'Bearer mockToken',
                'Content-Type': 'application/json',
                'my-additional-header': 'test-my-additional-header'
            });
        });
    });
});