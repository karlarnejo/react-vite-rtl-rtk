export interface ITableProps {
    children: React.ReactNode;
};

export const Table: React.FC<ITableProps> = ({ children }): React.JSX.Element => {
    return (
        <table className="w-full text-left rtl:text-right dark:text-gray-400">
            {children}
        </table>
    );
}