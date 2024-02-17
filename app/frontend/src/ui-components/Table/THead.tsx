export interface ITHeadProps {
    children: React.ReactNode;
}

export const THead: React.FC<ITHeadProps> = ({ children }): React.JSX.Element => {
    return (
        <thead className="uppercase bg-indigo-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>{children}</tr>
        </thead>
    );
};
