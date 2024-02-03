import { InlineError, TextLabel } from '../common/components';
import { validationMapper } from '../common/service';
import { IFormValidationsProps } from '../common/types';
import { useFormContext } from 'react-hook-form';

/** 
 * You still need to add you max character limit in validation regardless if you added maxInput.
 * maxInput is just getting the remaining characters.
 * **/
export interface IFormInputTextAreaProps {
    name: string;
    label: string;
    validations?: IFormValidationsProps[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    maxInput: number;
    onChange?: Function;
    onBlur?: Function;
}

export const FormInputTextArea: React.FC<IFormInputTextAreaProps> = ({
    name,
    label,
    placeholder,
    validations,
    disabled,
    required = false,
    maxInput,
    onChange,
    onBlur
}) => {
    const {
        register,
        formState: { errors },
        trigger,
        setValue,
        watch
    } = useFormContext();

    return (
        <div className="flex flex-col">
            <TextLabel required name={name} label={label} />
            <textarea
                className={`${errors && errors[name] ? 'border-red-500' : ''} resize shadow appearance-none border rounded h-full min-h-32 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none`}
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
            {maxInput && (
                <span className="text-gray-500 text-sm italic mt-1">{`Characters remaining: ${maxInput - watch(name).length}`}</span>
            )}
            {errors && errors[name] && <InlineError errors={errors} name={name} />}
        </div>
    );
};
