import { FormInputTextArea } from "../../ui-components";
// import { validationSample } from "./SearchProduct.service";

export const FormInputDescription: React.FC = (): React.JSX.Element => {
    return (
        <FormInputTextArea
            name="description"
            label="Description"
            // validations={validationSample}
            placeholder="Description"
            description="Enter product description"
            required
        />
    );
}