import { currencyConverter } from '../../common/services';
import { IProduct } from '../../common/types';
import { Table, THead, Th, TBody, Tr, Td, Button } from '../../ui-components';

export interface IProductTableProps {
    tableData: IProduct[];
}

export const ProductTable: React.FC<IProductTableProps> = ({ tableData }): React.JSX.Element => {
    return (
        <Table>
            <THead>
                <Th>Image</Th>
                <Th>Product Id</Th>
                <Th>Product Name</Th>
                <Th>Type</Th>
                <Th>Qty</Th>
                <Th>Price</Th>
                <Th>Action</Th>
            </THead>
            <TBody>
                {tableData && tableData.length > 0 ? (
                    tableData.map((product: IProduct) => {
                        const {
                            productId,
                            img,
                            productName,
                            productType,
                            qty,
                            price: { currencyCode, value },
                            actions
                        } = product;

                        const { viewItem, editItem, deleteItem } = actions || {};

                        return (
                            <Tr key={productId}>
                                <>
                                    <Td alt={productName} variant="img">{img}</Td>
                                    <Td variant="text">{productId}</Td>
                                    <Td variant="text">{productName}</Td>
                                    <Td variant="text">{productType}</Td>
                                    <Td variant="text">{qty}</Td>
                                    <Td variant="text">{`${currencyConverter(currencyCode)}${value}`}</Td>
                                    <Td variant="text">
                                        <div className="flex flex-row gap-x-3">
                                            <div>
                                                <Button
                                                    name="view"
                                                    label="View"
                                                    variant="primary"
                                                    roundedEdges='all'
                                                    onClick={() => viewItem && viewItem(product)}
                                                />
                                            </div>
                                            <div>
                                                <Button
                                                    name="edit"
                                                    label="Edit"
                                                    variant="secondary"
                                                    roundedEdges='all'
                                                    onClick={() => editItem && editItem(product)}
                                                />
                                            </div>
                                            <div>
                                                <Button
                                                    name="delete"
                                                    label="Delete"
                                                    variant="secondary"
                                                    roundedEdges='all'
                                                    onClick={() => deleteItem && deleteItem(product)}
                                                />
                                            </div>
                                        </div>
                                    </Td>
                                </>
                            </Tr>
                        );
                    })
                ) : (
                    <Tr>
                        <Td variant="text">No products found.</Td>
                    </Tr>
                )}
            </TBody>
        </Table>
    );
};
