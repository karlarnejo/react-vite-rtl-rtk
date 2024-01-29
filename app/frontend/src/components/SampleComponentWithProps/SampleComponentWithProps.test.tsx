import { render } from '@testing-library/react';
import { SampleComponentWithProps } from '.';

describe('SampleComponentWithProps', () => {
    it('should display properly', () => {
        const mockBtnOnClick = vi.fn();
        const { getByText } = render(<SampleComponentWithProps btnOnClick={mockBtnOnClick} />);

        expect(getByText('This is a sample component with props')).toBeInTheDocument();
        expect(getByText('Hard Coded Button')).toBeInTheDocument();
    });
});
