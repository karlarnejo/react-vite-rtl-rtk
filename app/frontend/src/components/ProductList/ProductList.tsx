import { IProduct } from "../../common/types";
import { List, ListItem } from "../../ui-components";

export interface IProductListProps {
    listData: IProduct[];
}

export const ProductList: React.FC<IProductListProps> = ({ listData }): React.JSX.Element => {
    return (
        <List>
            {listData && listData.length > 0 ? listData.map(( product: IProduct ) => {
                const {
                    productId,
                    img,
                    productName, productType,
                    qty,
                    price,
                    actions
                } = product;

                const { viewItem } = actions || {}

                return (
                    <ListItem key={productId} onClick={() => viewItem && viewItem(product)}>
                        <div className="flex flex-row gap-x-2 justify-between">
                            <div className="min-w-[100px]">
                                <span>{productName}</span>
                                <div className="flex flex-col text-sm text-gray-500">
                                    <span>{`Type: ${productType}`}</span>
                                    <span>{`In stock: ${qty}`}</span>
                                    <span>{price}</span>
                                </div>
                            </div>
                            <div>
                                <img className="w-32 border-solid border-2 border-blue-500" src={img as string}/>
                            </div>
                        </div>
                    </ListItem>
                );
            }): <ListItem>No products found.</ListItem>}
        </List>
    );
}