import { screen, render } from '@testing-library/react';
import { PProducts } from '..';

vi.mock('../../features', () => ({
    FProducts: () => {
        return <>FProducts</>;
    }
}));

vi.mock('../../components', () => ({
    Header: () => {
        return <>Header</>;
    },
    Link: () => {
        return <>Link</>;
    }
}));

describe('PProducts', () => {
    it('should display properly', () => {
        render(<PProducts />);

        expect(screen.getByText(/FProducts/i)).toBeInTheDocument();
        expect(screen.getByText(/Header/i)).toBeInTheDocument();
        expect(screen.getByText(/Link/i)).toBeInTheDocument();
    });
});
