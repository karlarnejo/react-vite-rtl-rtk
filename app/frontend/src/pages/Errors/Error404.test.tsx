import { render } from "@testing-library/react";
import { Error404 } from "..";

describe("Error404", () => {
    it("should display properly", () => {
        const { getByText } = render(<Error404/>)

        expect(getByText("Error 404: Page not found")).toBeInTheDocument();
    });
});