import { FormInput } from '../../ui-components';
import { validationSample } from './SearchProduct.service';

export const SearchProduct: React.FC = (): React.JSX.Element => {
    return (
        <FormInput
            name="searchProduct"
            label="Search product"
            validations={validationSample}
            placeholder="Search"
            description="Enter product name"
        />
    );
};
