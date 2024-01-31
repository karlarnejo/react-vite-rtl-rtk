import { screen, render } from '@testing-library/react';
import { Error404 } from '..';

describe('Error404', () => {
    it('should display properly', () => {
        render(<Error404 />);

        expect(screen.getByText('Error 404: Page not found')).toBeInTheDocument();
    });
});
