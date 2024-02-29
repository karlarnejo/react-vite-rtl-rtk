import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { useMemo } from 'react';
import { graphqlPath } from '../../common/constants';
import { Token } from '../../common/types';

export interface IUseApolloClientProps {
    token: Token;
}

export const useApolloClient = ({ token }: IUseApolloClientProps) => {
    return useMemo(() => {
        const cache: InMemoryCache = new InMemoryCache();
        const headerLink: ApolloLink = createHeaderLink(token);
        const httpLink: HttpLink = new HttpLink({
            uri: (operation) => `${graphqlPath}/${operation.operationName}`
        });
        // const httpLink = createUploadLink({
        //     uri: (operation) => `${graphqlPath}/${operation.operationName}`
        // });

        const onErrorLink: ApolloLink = createErrorLink();
        return new ApolloClient({
            link: from([headerLink, onErrorLink, httpLink]),
            cache,
            credentials: 'include'
        });
    }, [token]);
};

export const createErrorLink = (): ApolloLink => {
    return onError(({ graphQLErrors, networkError, operation }: ErrorResponse) => {
        const headers = operation.getContext().headers;
        if (graphQLErrors) {
            console.error('graphQLErrors', { ...graphQLErrors, headers });
        }

        if (networkError) {
            console.error('networkError', { ...networkError, headers });
        }
    });
};

// These headers are being passed from BFF to downstream.
export const createHeaderLink = (token: Token): ApolloLink => {
    return new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token.tokenValue}`,
                'my-additional-header': 'my-additional-header',
                notAddedToBaseDataSource: 'notAddedToBaseDataSource'
            }
        });
        return forward(operation);
    });
};
