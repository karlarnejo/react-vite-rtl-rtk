import { IButtonProps } from "../../common/types";
import { Button } from "../../ui-components";

export interface IHeaderProps {
    headerTitle: string;
    buttonProps?: IButtonProps;
}

export const Header: React.FC<IHeaderProps> = ({ headerTitle, buttonProps }): React.JSX.Element => {

    const handleActionButton = (): React.ReactNode => {
        if(buttonProps) {
            const { name, label, onClick, variant } = buttonProps;

            return (
                <div className="flex flex-col mt-4 md:ml-auto">
                    <Button
                        name={name}
                        label={label}
                        onClick={onClick}
                        variant={variant}
                    />
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:inline-block">
                <h1>{headerTitle}</h1>
            </div>
            {handleActionButton()}
        </div>
    );
};