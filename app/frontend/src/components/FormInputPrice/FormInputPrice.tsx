import { FormInput } from '../../ui-components';
import { priceValidation } from "./FormInputPrice.service";

export const FormInputPrice: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="price"
            label="Price"
            validations={priceValidation}
            placeholder="Product price"
            description="Accepts decimal value"
            required
        />
    );
};
