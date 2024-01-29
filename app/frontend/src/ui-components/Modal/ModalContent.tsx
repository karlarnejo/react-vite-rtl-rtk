export interface IModalContentProps {
    children: React.ReactNode;
}

export const ModalContent: React.FC<IModalContentProps> = ({ children }): React.JSX.Element => {
    return <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">{children}</div>;
};
