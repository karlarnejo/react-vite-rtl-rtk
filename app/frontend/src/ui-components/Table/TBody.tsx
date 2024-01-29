export interface ITBodyProps {
    children: React.ReactNode;
}

export const TBody: React.FC<ITBodyProps> = ({ children }): React.JSX.Element => {
    return <tbody>{children}</tbody>;
};
