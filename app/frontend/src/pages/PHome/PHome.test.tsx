import { screen, render } from '@testing-library/react';
import { PHome } from '..';

describe('PHome', () => {
    it('should display properly', () => {
        render(<PHome />);

        expect(screen.getByText('This is the home screen')).toBeInTheDocument();
    });
});
