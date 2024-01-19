export const buttonVariantChecker = (variant: string) => {
    switch(variant) {
        case 'secondary':
            return 'bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent';
        case 'primary':
        default:
            return 'bg-blue-500 hover:bg-blue-700 text-white';
    }
}