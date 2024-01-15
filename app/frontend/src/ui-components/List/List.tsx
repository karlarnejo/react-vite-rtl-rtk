export interface IListProps {
    children: React.ReactNode;
};

export const List: React.FC<IListProps> = ({ children }): React.JSX.Element => {
    return (
        <div className=" bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {children}
        </div>
    );
}