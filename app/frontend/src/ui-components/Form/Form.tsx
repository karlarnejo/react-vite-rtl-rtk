import { FieldValues, FormProvider, useForm } from 'react-hook-form';

export interface IFormParams<T> {
    values: T;
    isValid: boolean;
}

export interface IFormProps {
    children: React.ReactNode;
    onSubmit: (props: IFormParams<FieldValues>) => void;
    [key: string]: any;
}

export const Form: React.FC<IFormProps> = ({ children, onSubmit }): React.JSX.Element => {
    const form = useForm<FieldValues>();
    const {
        handleSubmit,
        formState: { isValid }
    } = form;

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit((values) => onSubmit({ values, isValid }))}>{children}</form>
        </FormProvider>
    );
};
