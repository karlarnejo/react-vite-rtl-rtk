import { regExpLettersOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const descriptionValidation: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Description is required'
    },
    {
        name: 'alphaNumeric',
        expression: (value: string) => {
            return !value || regExpLettersOnly.test(value);
        },
        message: 'Description should be letters only'
    },
    {
        name: 'inputMax',
        expression: (value: string) => {
            return !value || value.length <= 300;
        },
        message: 'Description should not go beyond 300 characters'
    }
];