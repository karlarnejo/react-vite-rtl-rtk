import { screen, render } from '@testing-library/react';
import { PSample } from '..';

vi.mock('../../features', () => ({
    FSample: () => {
        return <>FSample</>;
    }
}));

describe('PSample', () => {
    it('should display properly', () => {
        render(<PSample />);

        expect(screen.getByText('This is a sample page')).toBeInTheDocument();
        expect(screen.getByText('FSample')).toBeInTheDocument();
    });
});
