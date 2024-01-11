export interface IThProps {
    children: React.ReactNode;
    variant?: 'img' | 'text';
}

export const Th: React.FC<IThProps> = ({ children, variant = 'text' }): React.JSX.Element => {
    return (
        variant === 'img' ? (
            <th scope="col" className="font-normal px-4 py-3">
                <span className="inline-block">{children}</span>
            </th>
        ) : (
            <th scope="col" className="font-normal px-4 py-3">
                <span className="inline-block">{children}</span>
            </th>
        )
    );
}