import { render } from "@testing-library/react";
import { PSample } from "..";

vi.mock("../../features", () => ({
    FSample: () => {
        return <>FSample</>
    }
}));

describe("PSample", () => {
    it("should display properly", () => {
        const { getByText } = render(<PSample/>)

        expect(getByText("This is a sample page")).toBeInTheDocument();
        expect(getByText("FSample")).toBeInTheDocument();
    });
});