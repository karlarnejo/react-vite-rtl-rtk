import { Routes, Route } from "react-router-dom"
import { PHome, PProducts, PSample, PLogin, Error404 } from "./pages"
import { PrivateRoutes } from "./utils"
import { ApplicationRoutes } from "./common/enums";

export const AppRoute: React.FC = (): React.JSX.Element => {
    return(
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<PHome/>} path={ApplicationRoutes.Home}/>
                <Route element={<PProducts/>} path={ApplicationRoutes.Products}/>
                <Route element={<PSample/>} path={ApplicationRoutes.Sample}/>
            </Route>
            <Route path={ApplicationRoutes.Login} element={<PLogin/>}></Route>
            <Route path={ApplicationRoutes.EverythingElse} element={<Error404/>}></Route>
        </Routes>
    );
};