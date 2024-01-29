import { Link as ReactRouterDomLink } from 'react-router-dom';

export interface ILinkProps {
    icon: string;
    label: string;
    routeTo: string;
}

export const Link: React.FC<ILinkProps> = ({ icon, label, routeTo }): React.JSX.Element => {
    return (
        <ReactRouterDomLink className="flex flex-row items-center hover:underline" to={routeTo}>
            <svg
                className="w-4 h-4 mr-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
            >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
            </svg>
            {label}
        </ReactRouterDomLink>
    );
};
