export interface ITextLabelProps {
    required: boolean;
    name: string;
    label: string;
};

export const TextLabel: React.FC<ITextLabelProps> = ({ required, name, label }): React.JSX.Element => {
    return (
        <label className="block font-semibold mb-2" htmlFor={name}>
            {required ? `${label} *` : label}
        </label>
    );
}