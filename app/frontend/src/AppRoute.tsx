import { Routes, Route } from "react-router-dom"
import { PHome, PProducts, PSample, PLogin, Error404, PProductDetails, PEditProductDetails, PAddProduct } from "./pages"
import { PrivateRoutes } from "./utils"
import { ApplicationRoutes } from "./common/enums";
import { Token } from "./common/types";

export interface IAppRouteProps {
    token: Token;
}

export const AppRoute: React.FC<IAppRouteProps> = ({ token }): React.JSX.Element => {
    return(
        <Routes>
            <Route element={<PrivateRoutes token={token}/>}>
                <Route element={<PHome/>} path={ApplicationRoutes.Home}/>
                <Route element={<PProducts/>} path={ApplicationRoutes.Products}/>
                <Route element={<PAddProduct/>} path={ApplicationRoutes.AddProduct}/>
                <Route element={<PProductDetails/>} path={`${ApplicationRoutes.ProductDetail}/:productId`}/>
                <Route element={<PEditProductDetails/>} path={`${ApplicationRoutes.EditProductDetail}/:productId`}/>
                <Route element={<PSample/>} path={ApplicationRoutes.Sample}/>
            </Route>
            <Route path={ApplicationRoutes.Login} element={<PLogin/>}></Route>
            <Route path={ApplicationRoutes.EverythingElse} element={<Error404/>}></Route>
        </Routes>
    );
};