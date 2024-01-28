import { FieldErrors, FieldValues } from "react-hook-form";

export interface IInlineErrorProps {
    errors: FieldErrors<FieldValues>;
    name: string;
};

export const InlineError: React.FC<IInlineErrorProps> = ({ errors, name }): React.JSX.Element => {
    return (
        <span className="text-red-500 mt-1">{`${errors[name]?.message}`}</span>
    );
}