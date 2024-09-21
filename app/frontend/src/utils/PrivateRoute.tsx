import { Outlet, Navigate } from 'react-router-dom';
import { Token } from '../common/types';

export interface IPrivateRouteProps {
    token: Token;
}

export const PrivateRoutes: React.FC<IPrivateRouteProps> = ({ token }): React.JSX.Element => {
    //TODO: add expiration check along with tokenValue
    return token.tokenValue ? <Outlet /> : <Navigate to="/login" />;
};
