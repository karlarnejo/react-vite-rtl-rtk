import React from "react";
import { buttonVariantChecker } from "./Button.service";

export interface IButtonProps {
    name: string;
    label: string;
    onClick: Function;
    variant: 'primary' | 'secondary'
}

export const Button: React.FC<IButtonProps> = ({ name, label, onClick, variant }: IButtonProps): React.JSX.Element => {
    return (
        <button
            id={name}
            name={name}
            onClick={() => onClick()}
            className={`${buttonVariantChecker(variant)} py-2 px-4 rounded`}
        >
            {label}
        </button>
    )
}