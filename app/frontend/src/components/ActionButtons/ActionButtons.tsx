import { IActionButtonProps } from "../../common/types";
import { Button } from "../../ui-components";
import React from 'react';

export interface IActionButtonsProps {
    actionButtons: IActionButtonProps[];
}

export const ActionButtons: React.FC<IActionButtonsProps> = ({ actionButtons }: IActionButtonsProps): React.JSX.Element => {
    return (
        <div className="flex flex-col md:flex-row">
                {
                    actionButtons.map(({ label, onClick, variant, name }: IActionButtonProps) => (
                        <Button
                            className="mt-4 md:mr-4"
                            key={name}
                            name={name}
                            variant={variant}
                            label={label}
                            onClick={onClick}
                        />
                    ))
            }
        </div>
    );
}