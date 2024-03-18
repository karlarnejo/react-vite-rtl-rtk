import React, { ReactNode } from 'react';
import { handleRoundedChecker, handleVariantChecker } from './Button.service';

export interface IButtonProps {
    name: string;
    label: string;
    onClick: Function;
    variant: 'primary' | 'secondary';
    icon?: ReactNode;
    selected?: boolean;
    disabled?: boolean;
    value?: string | number;
    iconPosition?: 'left' | 'right';
    roundedEdges?: 'left' | 'right' | 'top' | 'bottom' | 'all';
}

export const Button: React.FC<IButtonProps> = ({ name, label, onClick, variant, icon, selected, disabled, value, iconPosition = 'left', roundedEdges }: IButtonProps): React.JSX.Element => {
    return (
        <button
            id={name}
            name={name}
            value={value}
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClick(event)}
            disabled={disabled}
            className={`${handleVariantChecker(variant, selected, disabled)} ${handleRoundedChecker(roundedEdges)} py-2 px-4 flex items-center justify-center`}
        >
            {icon && iconPosition === 'left' && icon}
            {label}
            {icon && iconPosition === 'right' && icon}
        </button>
    );
};
