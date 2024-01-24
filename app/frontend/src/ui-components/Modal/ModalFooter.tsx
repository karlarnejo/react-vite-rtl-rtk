export interface IModalFooterProps {
    children: React.ReactNode
};

export const ModalFooter: React.FC<IModalFooterProps> = ({ children }): React.JSX.Element => {
    return (
        <div className="items-center p-5 md:p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
            {children}
        </div>
    );
};