import { regExpLettersOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const validationSample: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Search field is required'
    },
    {
        name: 'alphaNumeric',
        expression: (value: string) => {
            return !value || regExpLettersOnly.test(value);
        },
        message: 'Input should be letters only'
    },
    {
        name: 'inputLessThree',
        expression: (value: string) => {
            return !value || value.length >= 3;
        },
        message: 'Input should be at least 3 characters'
    },
    {
        name: 'inputMaxSix',
        expression: (value: string) => {
            return !value || value.length <= 6;
        },
        message: 'Input should not go beyond 6 characters'
    }
];
