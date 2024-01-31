import { screen, render } from '@testing-library/react';
import { PLogin } from '..';

describe('PLogin', () => {
    it('should display properly', () => {
        render(<PLogin />);

        expect(screen.getByText('This is the login screen')).toBeInTheDocument();
    });
});
