import { render } from "@testing-library/react";
import { PProducts } from "..";

describe("PProducts", () => {
    it("should display properly", () => {
        const { getByText } = render(<PProducts/>)

        expect(getByText("This is the products screen")).toBeInTheDocument();
    });
});