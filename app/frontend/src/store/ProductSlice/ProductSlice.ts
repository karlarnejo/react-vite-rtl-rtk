import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { IResponseDeleteProduct } from "../../common/types";
import { RootState } from "..";

export const sliceName: string = 'productSlice';

export interface IProductSlice {
    deleteProduct: IResponseDeleteProduct
}

export const initialState: IProductSlice = {
    deleteProduct: {
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
        setResetProductSlice: () => {
            return initialState;
        }
    }
});

export const getProductSlice = (state: RootState) => state.productStore;

export const {
    setDeleteProduct,
    setResetProductSlice
} = productSlice.actions;