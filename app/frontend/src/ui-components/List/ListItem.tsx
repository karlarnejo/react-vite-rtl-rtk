export interface IListItemProps {
    children: React.ReactNode;
    onClick?: Function;
}

export const ListItem: React.FC<IListItemProps> = ({ children, onClick }): React.JSX.Element => {
    return (
        <div
            className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            onClick={() => onClick && onClick()}
        >
            {children}
        </div>
    );
};
