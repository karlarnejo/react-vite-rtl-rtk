export const handleBgColor = (variant: string): string => {
    switch(variant) {
        case 'success':
            return 'bg-green-50 text-green-800';
        case 'danger':
            return 'bg-red-50 text-red-800';
        case 'warning':
            return 'bg-orange-50 text-orange-800';
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export const handleIcon = (variant: string): string => {
    switch(variant) {
        case 'success':
            return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z';
        case 'danger':
            return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z';
        case 'warning':
            return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z';
        default:
            return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z'
    }
}

export const handleIconColor = (variant: string): string => {
    switch(variant) {
        case 'success':
            return 'text-green-500 bg-green-200';
        case 'danger':
            return 'text-red-500 bg-red-200';
        case 'warning':
            return 'text-orange-500 bg-orange-200';
        default:
            return 'text-gray-500 bg-gray-200'
    }
}