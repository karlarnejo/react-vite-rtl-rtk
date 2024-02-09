export const currencyConverter = (currencyCode: string) => {
    switch (currencyCode) {
        case 'USD':
            return '$';
        case 'PHP':
        default:
            return '₱';
    }
};

export const toUppercaseFirstLetter = (stringToCapitalize: string): string => {
    return `${stringToCapitalize.charAt(0).toUpperCase()}${stringToCapitalize.slice(1)}`;
}