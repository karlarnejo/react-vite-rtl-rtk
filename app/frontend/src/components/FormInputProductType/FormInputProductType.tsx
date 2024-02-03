import { FormInput } from '../../ui-components';
import { productTypeValidation } from "./FormInputProductType.service";

export const FormInputProductType: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="productType"
            label="Product type"
            validations={productTypeValidation}
            placeholder="Product type"
            required
        />
    );
};
