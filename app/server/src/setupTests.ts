/// <reference types="vitest/globals" />
import "@testing-library/jest-dom"

export const mockUseDispatch = vi.fn()
vi.mock('react-redux', () => ({
    ...vi.importActual<object>('react-redux'),
    useDispatch: () => mockUseDispatch
}));

// Cannot declare mock of mockUseNavigate navigate here. Throws an error for some reason

//TODO: mocking components
// let mockComponentWithProps
// const mockComponentButton = jest.fn()
// jest.mock('components', () => ({
//     // ComponentWithProps: props => {
//     //     mockComponentWithProps = props;
//     //     mockComponentButton(props);
//     //     return <>ComponentWithProps</>
//     // }
//     SampleComponent: () => {
//         return <>SampleComponent</>
//     }
// }))