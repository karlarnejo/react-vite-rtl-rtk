import { useState } from 'react';
import { handleBgColor, handleIcon, handleIconColor } from './Notification.service';

export interface INotificationProps {
    closeable?: boolean;
    variant?: 'success' | 'danger' | 'warning' | 'info';
    message: string
}

export const Notification: React.FC<INotificationProps> = ({ closeable, variant='info', message }): React.JSX.Element => {
    const [isVisible, setIsVisible] = useState(true);
    const [transitioning, setTransitioning] = useState(true);

    const handleClose = () => {
        setTransitioning(false)
    };

    const handleTransitionEnd = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <div
                    id={`message-${variant}`}
                    className={`
                        ${transitioning ? 'visible opacity-100' : 'invisible opacity-0'}
                        ${handleBgColor(variant)}
                        transition-all flex flex-row w-full p-4 rounded-lg shadow duration-300`}
                    role="alert"
                    onTransitionEnd={handleTransitionEnd}
                >
                    <div className={`${handleIconColor(variant)} inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg dark:bg-orange-700 dark:text-orange-200`}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d={handleIcon(variant)}/>
                        </svg>
                        <span className="sr-only">{`${variant} icon`}</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{message}</div>
                    {closeable && (
                        <button onClick={handleClose} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-warning" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </>
    );
};