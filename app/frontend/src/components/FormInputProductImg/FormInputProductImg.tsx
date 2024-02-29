import { FormFileInput } from '../../ui-components';

export const FormInputProductImg: React.FC = (): React.JSX.Element => {
    return (
        <FormFileInput
            name="img"
            label="Product image"
            placeholder="Product image"
            description="Single file upload"
            required
        />
    );
};
