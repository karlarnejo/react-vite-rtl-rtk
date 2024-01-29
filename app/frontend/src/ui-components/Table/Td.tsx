export interface ITdProps {
    children: React.ReactNode;
    variant?: 'img' | 'text';
}

export const Td: React.FC<ITdProps> = ({ children, variant = 'text' }): React.JSX.Element => {
    return (
        <>
            <td className="px-4 py-4 text-gray-900 dark:text-white">
                {variant === 'img' ? <img className="w-32 min-w-[128px]" src={children as string} /> : children}
            </td>
        </>
    );
};
