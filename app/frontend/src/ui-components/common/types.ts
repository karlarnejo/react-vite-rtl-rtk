export interface IFormValidationsProps {
    name: string;
    message: string;
    expression?: (value: string) => boolean;
}

export interface IReactHookFormValidateProps {
    [key: string]: (value: string) => boolean | string | undefined;
}