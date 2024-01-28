import { FormInput } from "../../ui-components";
// import { validationSample } from "./SearchProduct.service";

export const FormInputProductType: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="productType"
            label="Product type"
            // validations={validationSample}
            placeholder="Product type"
            description="Enter product type"
            required
        />
    );
}