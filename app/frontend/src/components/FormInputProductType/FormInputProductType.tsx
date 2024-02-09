import { FormSelect } from '../../ui-components';
import { productTypeValidation } from "./FormInputProductType.service";

export const FormInputProductType: React.FC = (): React.JSX.Element => {
    return (
        <FormSelect
            name="productType"
            label="Product type"
            validations={productTypeValidation}
            placeholder="Please select the product type..."
            required
        >
            <option value="room">Room</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="msc">Miscellaneous</option>
        </FormSelect>
    );
};
