import { screen, render } from '@testing-library/react';
import { AppRoute } from './AppRoute';
import { BrowserRouter } from 'react-router-dom';
import { Token } from './common/types';

vi.mock('./utils', () => ({
    PrivateRoutes: () => <>PrivateRoutes</>
}));

vi.mock('./common/Error404', () => ({
    Error404: () => <>Error404</>
}));

const mockToken: Token = { tokenValue: 'mockToken' };
export const renderComponent = () => {
    return render(
        <BrowserRouter>
            <AppRoute token={mockToken} />
        </BrowserRouter>
    );
};

describe('AppRoute', () => {
    it('should render home properly', () => {
        renderComponent();
        expect(screen.getByText('PrivateRoutes')).toBeInTheDocument();
    });
});
