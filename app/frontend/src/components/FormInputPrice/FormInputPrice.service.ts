import { regExpPositiveFloatOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const priceValidation: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Price is required'
    },
    {
        name: 'positiveFloatOnly',
        expression: (value: string) => {
            return !value || regExpPositiveFloatOnly.test(value);
        },
        message: 'Price should be numbers and decimal only'
    }
];