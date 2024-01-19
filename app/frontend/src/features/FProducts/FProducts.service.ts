import { IProduct, IActions } from "../../common/types";

export const handleActionMapper = (productData: IProduct[], actions: IActions): IProduct[] => {
    return productData.map(product => ({
        ...product,
        actions
    }));
}