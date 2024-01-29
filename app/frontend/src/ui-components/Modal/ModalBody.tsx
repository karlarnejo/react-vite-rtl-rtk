export interface IModalBodyProps {
    children: React.ReactNode;
}

export const ModalBody: React.FC<IModalBodyProps> = ({ children }): React.JSX.Element => {
    return <div className="p-5 md:p-4 space-y-4">{children}</div>;
};
