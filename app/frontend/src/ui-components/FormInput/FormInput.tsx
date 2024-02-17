import { InlineError, InputDescription, TextLabel } from '../common/components';
import { validationMapper } from '../common/service';
import { IFormValidationsProps } from '../common/types';
import { useFormContext } from 'react-hook-form';

export interface IFormInputProps {
    name: string;
    label: string;
    validations?: IFormValidationsProps[];
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: Function;
    onBlur?: Function;
}

export const FormInput: React.FC<IFormInputProps> = ({
    name,
    label,
    placeholder,
    description,
    validations,
    disabled,
    required = false,
    onChange,
    onBlur
}) => {
    const {
        register,
        formState: { errors },
        trigger,
        setValue
    } = useFormContext();

    return (
        <div className="flex flex-col">
            <TextLabel required name={name} label={label} />
            <input
                className={`${errors && errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-indigo-300 focus:ring-indigo-500'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight transition focus:outline-none duration-300 rounded-md focus:ring-2`}
                id={name}
                placeholder={placeholder}
                {...register(name, {
                    disabled: disabled,
                    validate: {
                        required: (value) => {
                            // Not utilizing the built in required so
                            // that the validation array is uniform.
                            // The required message can be overriden. Just pass require and message.
                            // weird falsy !value is not working. Night already, cant think straight.
                            // Will return once have the time but low prio.
                            return required ? value !== '' || 'This field is required' : undefined;
                        },
                        ...(validations && validationMapper(validations, required))
                    }
                })}
                onBlur={onBlur ? () => onBlur() : () => trigger(name)}
                onChange={onChange ? () => onChange() : (event) => setValue(name, event.target.value)}
            />
            {description && <InputDescription description={description} />}
            {errors && errors[name] && <InlineError errors={errors} name={name} />}
        </div>
    );
};
