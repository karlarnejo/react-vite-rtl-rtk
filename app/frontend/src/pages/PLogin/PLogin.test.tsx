import { render } from "@testing-library/react";
import { PLogin } from "..";

describe("PLogin", () => {
    it("should display properly", () => {
        const { getByText } = render(<PLogin/>)

        expect(getByText("This is the login screen")).toBeInTheDocument();
    });
});