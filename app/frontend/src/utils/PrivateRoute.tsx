import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes: React.FC = (): React.JSX.Element => {
    //TODO: call auth hook here
    // let auth = {'token':false}
    let auth = {'token':true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}