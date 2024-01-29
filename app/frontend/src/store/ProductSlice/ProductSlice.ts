import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { IResponseAddProduct, IResponseDeleteProduct, IResponseEditProduct } from '../../common/types';
import { RootState } from '..';

export const sliceName: string = 'productSlice';

export interface IProductSlice {
    deleteProduct: IResponseDeleteProduct;
    editProduct: IResponseEditProduct;
    addProduct: IResponseAddProduct;
}

export const initialState: IProductSlice = {
    deleteProduct: {
        status: '',
        productId: ''
    },
    editProduct: {
        status: '',
        productId: ''
    },
    addProduct: {
        status: '',
        productId: ''
    }
};

export const productSlice: Slice = createSlice<IProductSlice, any>({
    name: sliceName,
    initialState,
    reducers: {
        setDeleteProduct: (state: IProductSlice, { payload }: PayloadAction<IResponseDeleteProduct>) => {
            state.deleteProduct = payload;
        },
        setEditProduct: (state: IProductSlice, { payload }: PayloadAction<IResponseEditProduct>) => {
            state.editProduct = payload;
        },
        setAddProduct: (state: IProductSlice, { payload }: PayloadAction<IResponseAddProduct>) => {
            state.addProduct = payload;
        },
        setResetProductSlice: () => {
            return initialState;
        }
    }
});

export const getProductSlice = (state: RootState) => state.productStore;

export const { setDeleteProduct, setResetProductSlice, setEditProduct, setAddProduct } = productSlice.actions;
