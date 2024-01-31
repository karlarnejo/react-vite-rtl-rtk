import { screen, render } from '@testing-library/react';
import { SampleComponentWithProps } from '.';

describe('SampleComponentWithProps', () => {
    it('should display properly', () => {
        const mockBtnOnClick = vi.fn();
        render(<SampleComponentWithProps btnOnClick={mockBtnOnClick} />);

        expect(screen.getByText('This is a sample component with props')).toBeInTheDocument();
        expect(screen.getByText('Hard Coded Button')).toBeInTheDocument();
    });
});
