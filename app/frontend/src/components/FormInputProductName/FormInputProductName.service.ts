import { regExpAlphanumericWithSpacesOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const productNameValidation: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Product name is required'
    },
    {
        name: 'alphaNumeric',
        expression: (value: string) => {
            return !value || regExpAlphanumericWithSpacesOnly.test(value);
        },
        message: 'Product name should be letters only'
    },
    {
        name: 'inputMax',
        expression: (value: string) => {
            return !value || value.length <= 50;
        },
        message: 'Product name should not go beyond 50 characters'
    }
];