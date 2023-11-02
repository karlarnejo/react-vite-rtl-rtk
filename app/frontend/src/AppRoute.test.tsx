import { render } from "@testing-library/react"
import { AppRoute } from "./AppRoute"
import { BrowserRouter } from "react-router-dom"

vi.mock('./utils', () => ({
    PrivateRoutes: () => <>PrivateRoutes</>
}));

vi.mock('./common/Error404', () => ({
    Error404: () => <>Error404</>
})) 

export const renderComponent = () => {
    return(
        render(
            <BrowserRouter>
                <AppRoute/>
            </BrowserRouter>
        )
    )
}

describe("AppRoute", () => {
    it('should render home properly', () => {
        const { getByText } = renderComponent()
        expect(getByText('PrivateRoutes')).toBeInTheDocument();
    });
})