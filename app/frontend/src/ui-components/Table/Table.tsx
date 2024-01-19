export interface ITableProps {
    children: React.ReactNode;
};

export const Table: React.FC<ITableProps> = ({ children }): React.JSX.Element => {
    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-left rtl:text-right dark:text-gray-400">
                {children}
            </table>
        </div>
    );
}