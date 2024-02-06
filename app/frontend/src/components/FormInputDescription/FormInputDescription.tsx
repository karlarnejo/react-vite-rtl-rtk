import { FormInputTextArea } from '../../ui-components';
import { descriptionValidation } from "./FormInputDescription.service";

export const FormInputDescription: React.FC = (): React.JSX.Element => {
    return (
        <FormInputTextArea
            name="description"
            label="Description"
            validations={descriptionValidation}
            placeholder="Description"
            required
            maxInput={500}
        />
    );
};
