import { useRef } from 'react';
import { InlineError, InputDescription, TextLabel } from '../common/components';
import { validationMapper } from '../common/service';
import { IFormValidationsProps } from '../common/types';
import { useFormContext } from 'react-hook-form';

export interface IFormFileInputProps {
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

export const FormFileInput: React.FC<IFormFileInputProps> = ({
    name,
    label,
    description,
    validations,
    disabled,
    required = false,
    onChange,
    onBlur
}) => {
    // TODO: Check why overriding the register ref fixes the UI not reflecting the chosen file name
    const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const {
        register,
        formState: { errors },
        trigger,
        setValue
    } = useFormContext();

    const handleValueSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setValue(name, event.target.files[0])
        }
    }

    return (
        <div className="flex flex-col">
            <TextLabel required name={name} label={label} />
            <input
                className={`${errors && errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-indigo-300 focus:ring-indigo-500'} shadow border rounded w-full py-1.5 px-3 transition focus:outline-none duration-300 rounded-md focus:ring-2 file:text-white file:-my-2 file:-mx-3 file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-indigo-500 file:px-6 file:py-2 file:[border-inline-end-width:1px] file:[margin-inline-end:1rem]`}
                id={name}
                type="file"
                {...register(name, {
                    disabled: disabled,
                    validate: {
                        required: (value) => {
                            // Not utilizing the built in required so
                            // that the validation array is uniform.
                            // The required message can be overriden. Just pass require and message.
                            return value ?? 'This field is required';
                        },
                        ...(validations && validationMapper(validations, required))
                    }
                })}
                ref={fileInputRef}
                // TODO: Retain focus on input while file chooser popup is shown to prevent onBlur validation while still choosing file.
                onBlur={onBlur ? () => onBlur() : () => trigger(name)}
                onChange={onChange ? () => onChange() : (event) => handleValueSetter(event)}
            />
            {description && <InputDescription description={description} />}
            {errors && errors[name] && <InlineError errors={errors} name={name} />}
        </div>
    );
};
