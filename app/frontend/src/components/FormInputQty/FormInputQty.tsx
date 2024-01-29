import { FormInput } from '../../ui-components';
// import { validationSample } from "./SearchProduct.service";

export const FormInputQty: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="qty"
            label="Quantity"
            // validations={validationSample}
            placeholder="Quantity"
            description="Enter product quantity"
            required
        />
    );
};
