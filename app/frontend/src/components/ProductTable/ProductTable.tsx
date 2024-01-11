import { IProductData } from "../../common/types";
import { Table, THead, Th, TBody, Tr, Td, Button } from "../../ui-components";

export interface IProductTableProps {
    tableData: IProductData[]
}

export const ProducTable: React.FC<IProductTableProps> = ({ tableData }): React.JSX.Element => {
    return (
        <Table>
            <THead>
                <Th variant='img'>
                    Image
                </Th>
                <Th variant='text'>
                    Product Id
                </Th>
                <Th variant='text'>
                    Product Name
                </Th>
                <Th variant='text'>
                    Type
                </Th>
                <Th>
                    Availability
                </Th>
                <Th variant='text'>
                    Qty
                </Th>
                <Th variant='text'>
                    Price
                </Th>
                <Th variant='text'>
                    Action
                </Th>
            </THead>
            <TBody>
                {
                    tableData.map(( product ) => {
                        const {
                            productId,
                            img,
                            availability,
                            productName, productType,
                            qty,
                            price,
                            actions: { editItem, deleteItem }
                        } = product;
                        
                        return (    
                            <Tr key={productId}>
                                <>
                                    <Td variant='img'>
                                        {img}
                                    </Td>
                                    <Td variant='text'>
                                        {productId}
                                    </Td>
                                    <Td variant='text'>
                                        {productName}
                                    </Td>
                                    <Td variant='text'>
                                        {productType}
                                    </Td>
                                    <Td variant='text'>
                                        {availability}
                                    </Td>
                                    <Td variant='text'>
                                        {qty}
                                    </Td>
                                    <Td variant='text'>
                                        {price}
                                    </Td>
                                    <Td variant='text'>
                                        <div className="flex flex-row gap-x-3">
                                            <div>
                                                <Button name='edit' label='Edit' variant='primary' onClick={() => editItem(product)}/>
                                            </div>
                                            <div>
                                                <Button name='delete' label='Delete' variant='secondary' onClick={() => deleteItem(product)}/>
                                            </div>
                                        </div>
                                    </Td>
                                </>
                            </Tr>
                        )
                    })
                }
            </TBody>
        </Table>
    );
};