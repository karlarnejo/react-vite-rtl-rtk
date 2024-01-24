export interface IModalHeaderProps {
    children: React.ReactNode
}

export const ModalHeader: React.FC<IModalHeaderProps> = ({ children }): React.JSX.Element => {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 p-5 md:p-4 border-b rounded-t dark:border-gray-600">
            {children}
        </div>
    );
}