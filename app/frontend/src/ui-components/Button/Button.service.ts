export const handleVariantChecker = (variant: string, selected?: boolean, disabled?: boolean) => {
    switch (variant) {
        case 'secondary':
            return `${selected && 'bg-indigo-500 text-white border-transparent'} hover:bg-indigo-500 text-indigo-700 hover:text-white border border-indigo-500 hover:border-transparent`;
        case 'primary':
        default:
            return `${disabled ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-700'} ${selected && 'bg-indigo-700'} text-white`;
    }
};

export const handleRoundedChecker = (rounded: string | undefined) => {
    switch (rounded) {
        case 'top':
            return 'rounded-t';
        case 'bottom':
            return 'rounded-b';
        case 'left':
            return 'rounded-l';
        case 'right':
            return 'rounded-r';
        case 'all':
            return 'rounded'
        default:
            return '';
    }
};

export const handleButtonSize = (size: string | undefined) => {
    switch (size) {
        case 'xs':
            return 'w-12';
        case 'sm':
            return 'w-16';
        case 'md':
            return 'w-24';
        case 'lg':
            return 'w-36';
        case 'xl':
            return 'w-52'
        case 'xlg':
            return 'w-64'
        case 'xxl':
            return 'w-96'
        default:
            return '';
    }
}