export const buttonVariantChecker = (variant: string) => {
    switch (variant) {
        case 'secondary':
            return 'bg-transparent hover:bg-indigo-500 text-indigo-700 hover:text-white border border-indigo-500 hover:border-transparent';
        case 'primary':
        default:
            return 'bg-indigo-500 hover:bg-indigo-700 text-white';
    }
};
