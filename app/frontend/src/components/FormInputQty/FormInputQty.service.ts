import { regExpPositiveWholeNumbersOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const quantityValidation: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Quantity is required'
    },
    {
        name: 'positiveFloatOnly',
        expression: (value: string) => {
            return !value || regExpPositiveWholeNumbersOnly.test(value);
        },
        message: 'Quantity should be positive numbers only'
    }
];