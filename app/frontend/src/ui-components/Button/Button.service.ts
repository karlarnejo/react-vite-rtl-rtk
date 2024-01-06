import { customClassName } from "../common/service";

export const buttonVariantChecker = (variant: string, className?: string) => {
    switch(variant) {
        case 'primary':
            return customClassName('bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded', className);
        case 'secondary':
            return customClassName('bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded', className);
        default:
            return 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
    }
}