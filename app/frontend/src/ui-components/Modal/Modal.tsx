export interface IModalProps {
    open: boolean;
    onClose: Function;
    closeableBackground?: boolean;
    children: React.ReactNode
};

export const Modal: React.FC<IModalProps> = ({ open, onClose, closeableBackground, children }): React.JSX.Element => {
    return (
        <div
            id="default-modal"
            onClick={() => closeableBackground && onClose()} tabIndex={-1} 
            aria-hidden="true"
            className={`${open ? "visible bg-black/20" : "invisible"}
                fixed top-0 left-0 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden z-50`
            }
        >            
            <div className="relative p-4 w-full max-w-2xl max-h-full" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};