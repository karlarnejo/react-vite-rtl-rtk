import { render } from "@testing-library/react";
import { PProducts } from "..";

vi.mock("../../features", () => ({
    FProducts: () => {
        return <>FProducts</>
    }
}));

vi.mock("../../components", () => ({
    Header: () => {
        return <>Header</>
    },
    Link: () => {
        return <>Link</>
    }
}));

describe("PProducts", () => {
    it("should display properly", () => {
        const { getByText } = render(<PProducts/>)

        expect(getByText(/FProducts/i)).toBeInTheDocument();
        expect(getByText(/Header/i)).toBeInTheDocument();
        expect(getByText(/Link/i)).toBeInTheDocument();
    });
});