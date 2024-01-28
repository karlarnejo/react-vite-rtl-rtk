export const currencyConverter = (currencyCode: string) => {
    switch(currencyCode) {
        case 'USD':
            return '$'
        case 'PHP':
        default:
            return '₱'
    };
};