import { FormInput } from '../../ui-components';
import { productNameValidation } from "./FormInputProductName.service";

export const FormInputProductName: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="productName"
            label="Product name"
            validations={productNameValidation}
            placeholder="Product name"
            required
        />
    );
};
