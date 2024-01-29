import { render } from '@testing-library/react';
import { SampleComponent } from '.';

describe('SampleComponent', () => {
    it('should display properly', () => {
        const { getByText } = render(<SampleComponent />);

        expect(getByText('This is a sample component')).toBeInTheDocument();
    });
});
