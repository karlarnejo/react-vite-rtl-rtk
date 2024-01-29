export interface IInputDescriptionProps {
    description: string;
}

export const InputDescription: React.FC<IInputDescriptionProps> = ({ description }): React.JSX.Element => {
    return <span className="text-gray-500 text-sm italic mt-1">{description}</span>;
};
