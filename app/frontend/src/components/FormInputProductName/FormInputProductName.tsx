import { FormInput } from "../../ui-components";
// import { validationSample } from "./SearchProduct.service";

export const FormInputProductName: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="productName"
            label="Product name"
            // validations={validationSample}
            placeholder="Product name"
            description="Enter product name"
            required
        />
    );
}