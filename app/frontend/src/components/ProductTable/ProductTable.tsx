import { IProductData } from "../../common/types";
import { Table, THead, Th, TBody, Tr, Td, Button } from "../../ui-components";

export interface IProductTableProps {
    tableData: IProductData[]
}

export const ProducTable: React.FC<IProductTableProps> = ({ tableData }): React.JSX.Element => {
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
                {tableData.map(( product: IProductData ) => {
                    const {
                        productId,
                        img,
                        productName, productType,
                        qty,
                        price,
                        actions: { viewItem, editItem, deleteItem }
                    } = product;
                    
                    return (    
                        <Tr key={productId}>
                            <>
                                <Td variant='img'>{img}</Td>
                                <Td variant='text'>{productId}</Td>
                                <Td variant='text'>{productName}</Td>
                                <Td variant='text'>{productType}</Td>
                                <Td variant='text'>{qty}</Td>
                                <Td variant='text'>{price}</Td>
                                <Td variant='text'>
                                    <div className="flex flex-row gap-x-3">
                                        <div>
                                            <Button name='view' label='View' variant='primary' onClick={() => viewItem(product)}/>
                                        </div>
                                        <div>
                                            <Button name='edit' label='Edit' variant='secondary' onClick={() => editItem(product)}/>
                                        </div>
                                        <div>
                                            <Button name='delete' label='Delete' variant='secondary' onClick={() => deleteItem(product)}/>
                                        </div>
                                    </div>
                                </Td>
                            </>
                        </Tr>
                    )
                })}
            </TBody>
        </Table>
    );
};