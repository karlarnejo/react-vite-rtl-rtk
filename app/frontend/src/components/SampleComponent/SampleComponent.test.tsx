import { screen, render } from '@testing-library/react';
import { SampleComponent } from '.';

describe('SampleComponent', () => {
    it('should display properly', () => {
        render(<SampleComponent />);

        expect(screen.getByText('This is a sample component')).toBeInTheDocument();
    });
});
