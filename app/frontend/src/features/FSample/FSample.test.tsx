import { render, waitFor } from "@testing-library/react"
import { FSample } from "."
import { ISampleComponentWithProps } from "../../components";
import { mockUseDispatch } from "../../setupTests";

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', () => {
    const reactRouterDom = vi.importActual('react-router-dom');
    return {
        ...reactRouterDom,
        useNavigate: () => mockUseNavigate
    }
});

const mockSampleComponentWithProps = vi.fn();
let mockSampleComponentWithPropsProps: any;
vi.mock('../../components', () => ({
    SampleComponentWithProps: (props: ISampleComponentWithProps) => {
        mockSampleComponentWithPropsProps = props;
        mockSampleComponentWithProps(props);
        return <>SampleComponentWithProps</>
    },
    SampleComponent: () => {
        return <>SampleComponent</>
    }
}));

describe("FSample", () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should display this is a sample feature", () => {
        const { getByText } = render(<FSample/>)

        expect(getByText("This is a sample feature")).toBeInTheDocument();
        expect(getByText(/SampleComponentWithProps/i)).toBeInTheDocument();
        expect(getByText(/SampleComponent/i)).toBeInTheDocument();
    });

    it.only("should redirect to home page and call dispatch", async () => {
        render(<FSample/>)
        
        await waitFor(() => {
            mockSampleComponentWithPropsProps.btnOnClick()
            // Do this when you are trying to cover event changes like onBlur/onChange with a mocked component.
            // mockSampleComponentWithPropsProps.onBlur('123456')
            expect(mockUseDispatch).toHaveBeenCalledWith({
                payload: 'Updated inner object',
                type: 'sampleSlice/setFirstObject'
            });
            expect(mockUseNavigate).toHaveBeenCalledWith('/')
        })
    })
})