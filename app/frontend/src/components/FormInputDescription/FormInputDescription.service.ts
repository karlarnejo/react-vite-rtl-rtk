import { regExpAlphanumericWithSpacesOnly } from '../../common/constants';
import { IFormValidationsProps } from '../../common/types';

export const descriptionValidation: IFormValidationsProps[] = [
    {
        name: 'required',
        message: 'Description is required'
    },
    {
        name: 'inputMax',
        expression: (value: string) => {
            return !value || value.length <= 500;
        },
        message: 'Description should not go beyond 300 characters'
    }
];