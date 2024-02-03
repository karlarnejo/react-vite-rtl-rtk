import { regExpLettersOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const productTypeValidation: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Product type is required'
    },
    {
        name: 'alphaNumeric',
        expression: (value: string) => {
            return !value || regExpLettersOnly.test(value);
        },
        message: 'Product type should be letters only'
    },
    {
        name: 'inputMax',
        expression: (value: string) => {
            return !value || value.length <= 20;
        },
        message: 'Product type should not go beyond 20 characters'
    }
];