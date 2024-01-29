export interface ITrProps {
    children: React.ReactNode;
}

// TODO: add onClick on tr and prevent this onClick if there is an onClick i.e.
// a button in td
export const Tr: React.FC<ITrProps> = ({ children }): React.JSX.Element => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {children}
        </tr>
    );
};
