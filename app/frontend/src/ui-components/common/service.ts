import { IFormValidationsProps, IReactHookFormValidateProps } from "./types";

export const validationMapper = (validations: IFormValidationsProps[], required: boolean): IReactHookFormValidateProps => {
    let validationObject: IReactHookFormValidateProps = {}

    validations.forEach(({ name, expression, message }: IFormValidationsProps) => {    
        validationObject[name] = (value: string): boolean | string | undefined => {
            if(name === 'required') {
                if(required) {
                    return value !== '' || (message ? message : "This field is required");
                }
            } else {
                return expression && expression(value) || message;
            }
        };
    })

    return validationObject;
}