import { render } from '@testing-library/react';
import { PHome } from '..';

describe('PHome', () => {
    it('should display properly', () => {
        const { getByText } = render(<PHome />);

        expect(getByText('This is the home screen')).toBeInTheDocument();
    });
});
