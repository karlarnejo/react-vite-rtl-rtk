import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { IResponseDeleteProduct, IResponseEditProduct } from "../../common/types";
import { RootState } from "..";

export const sliceName: string = 'productSlice';

export interface IProductSlice {
    deleteProduct: IResponseDeleteProduct;
    editProduct: IResponseEditProduct;
}

export const initialState: IProductSlice = {
    deleteProduct: {
        status: '',
        productId: ''
    },
    editProduct: {
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
        setResetProductSlice: () => {
            return initialState;
        }
    }
});

export const getProductSlice = (state: RootState) => state.productStore;

export const {
    setDeleteProduct,
    setResetProductSlice,
    setEditProduct
} = productSlice.actions;