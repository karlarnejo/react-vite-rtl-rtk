import { InlineError, InputDescription, TextLabel } from '../common/components';
import { validationMapper } from '../common/service';
import { IFormValidationsProps } from '../common/types';
import { useFormContext } from 'react-hook-form';

export interface IFormSelectProps {
    name: string;
    label: string;
    validations?: IFormValidationsProps[];
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: Function;
    onBlur?: Function;
    children: React.ReactNode;
}

export const FormSelect: React.FC<IFormSelectProps> = ({
    name,
    label,
    placeholder = "Please select...",
    description,
    validations,
    disabled,
    required = false,
    onChange,
    onBlur,
    children
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
            <select
                className={`${errors && errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-50 focus:ring-gray-500'} appearance-none custom-arrow-select shadow border rounded bg-gray-100 w-full px-2 py-2 text-gray-700 leading-tight transition focus:outline-none duration-300 px-4 py-2 rounded-md focus:ring-2`}
                id={name}
                defaultValue=""
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
            >
                <option value="">{placeholder}</option>
                {children}
            </select>
            {description && <InputDescription description={description} />}
            {errors && errors[name] && <InlineError errors={errors} name={name} />}
        </div>
    );
};
