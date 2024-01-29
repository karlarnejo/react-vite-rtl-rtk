import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from './AppRoute';
import { Provider } from 'react-redux';
import { store } from './store';
import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { useApolloClient } from './hooks/useApolloClient/useApolloClient';
import { Token } from './common/types';

const App: React.FC = (): React.JSX.Element => {
    const [token, setToken] = useState<Token>({
        tokenValue: 'mockTokenValue'
    });
    const client = useApolloClient({ token });

    // TODO: implement token call here and store it somewhere i.e. localStorage

    return (
        <>
            {/* TODO: Add more provider if necessary */}
            <div className="min-w-[200px] min-h-[50px] mr-20 ml-20 mt-12 mb-12 md:mr-40 md:ml-40">
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <AppRoute token={token} />
                        </BrowserRouter>
                    </Provider>
                </ApolloProvider>
            </div>
        </>
    );
};
export default App;
