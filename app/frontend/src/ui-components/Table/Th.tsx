export interface IThProps {
    children: React.ReactNode;
}

export const Th: React.FC<IThProps> = ({ children }): React.JSX.Element => {
    return (
        <th scope="col" className="font-normal px-4 py-3">
            <span className="inline-block">{children}</span>
        </th>
    );
}