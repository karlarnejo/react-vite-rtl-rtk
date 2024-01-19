export const LoadingSpinner: React.FC = (): React.JSX.Element => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
};