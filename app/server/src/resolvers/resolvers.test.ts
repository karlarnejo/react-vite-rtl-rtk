import { Mock } from 'vitest'
import { resolvers } from './resolvers';
import { IGetLimitParams } from '../common/types';

const mockGetAllProducts: Mock = vi.fn();

describe('resolvers', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    const mockLimit: IGetLimitParams = { limit: 3 }

    describe('Success queries', () => {
        const dataSources = {
            productApi: {
                getAllProducts: mockGetAllProducts.mockResolvedValue({})
            }   
        };

        it('Query - getAllProducts', async () => {
            await resolvers.Query.getAllProducts(undefined, mockLimit, { dataSources } as any);
            expect(dataSources.productApi.getAllProducts).toHaveBeenCalled();
        });
    });
});