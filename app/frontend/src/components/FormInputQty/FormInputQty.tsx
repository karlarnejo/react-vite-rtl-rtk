import { FormInput } from '../../ui-components';
import { quantityValidation } from "./FormInputQty.service";

export const FormInputQty: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="qty"
            label="Quantity"
            validations={quantityValidation}
            placeholder="Quantity"
            required
        />
    );
};
