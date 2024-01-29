import { FormInput } from '../../ui-components';
// import { validationSample } from "./SearchProduct.service";

export const FormInputPrice: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="price"
            label="Price"
            // validations={validationSample}
            placeholder="Product price"
            description="Enter product price"
            required
        />
    );
};
