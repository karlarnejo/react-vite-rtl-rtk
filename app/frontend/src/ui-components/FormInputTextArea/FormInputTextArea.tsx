import { InlineError, InputDescription, TextLabel } from "../common/components";
import { validationMapper } from "../common/service";
import { IFormValidationsProps } from "../common/types";
import { useFormContext } from "react-hook-form";

export interface IFormInputTextAreaProps {
    name: string;
    label: string;
    validations?: IFormValidationsProps[];
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    // TODO: when custom onChange and onBlur
    // onChange?: Function;
    // onBlur?: Function; 
}

export const FormInputTextArea: React.FC<IFormInputTextAreaProps> = ({ name, label, placeholder, description, validations, disabled, required = false }) => {
    const { register, formState: { errors }, trigger } = useFormContext()

    return (
        <div className="flex flex-col">
            <TextLabel required name={name} label={label} />
            <textarea
                className={`${errors && errors[name] ? 'border-red-500' : ''} resize shadow appearance-none border rounded h-full min-h-32 max-h-32 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none`}
                id={name}
                placeholder={placeholder}
                {...register(name, {
                    disabled: disabled,
                    validate: {
                        required: (value) => {
                            // Not utilizing the built in required so
                            // that the validation array is uniform.
                            // The required message can be overriden. Just pass require and message.
                            // weird falsy !value is not working
                            return (
                                required ? ((value !== '') ||  "This field is required") : undefined
                            );
                        },
                        ...(validations && validationMapper(validations, required))
                    },
                })}
                onBlur={() => trigger(name)}
            />
            {description && (
                <InputDescription description={description} />
            )}
            {errors && errors[name] && (
                <InlineError errors={errors} name={name} />
            )}
        </div>
    );
};