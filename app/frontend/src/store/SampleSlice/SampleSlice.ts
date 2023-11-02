import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export const sliceName: string = 'sampleSlice';

export interface IFirstObject {
    firstObjectVar: string;
};

export interface ISecondInnerObject {
    secondInnerObjectVarOne: string;
    secondInnerObjectVarTwo: string;
}

export interface ISecondObject {
    secondInnerObject: ISecondInnerObject;
};

export interface ISampleSlice {
    firstObject: IFirstObject;
    secondObject: ISecondObject;
};

export const initialState: ISampleSlice = {
    firstObject: {
        firstObjectVar: ''
    },
    secondObject: {
        secondInnerObject: {
            secondInnerObjectVarOne: "",
            secondInnerObjectVarTwo: ""
        }
    }
};

export const sampleSlice: Slice = createSlice<ISampleSlice, any>({
    name: sliceName,
    initialState,
    reducers: {
        setFirstObject: (state: ISampleSlice, { payload }: PayloadAction<IFirstObject>) => {
            state.firstObject = payload
        },
        setFirstObjectVar: (state: ISampleSlice, { payload }: PayloadAction<string>) => {
            state.firstObject.firstObjectVar = payload
        },
        setSecondObject: (state: ISampleSlice, { payload }: PayloadAction<ISecondObject>) => {
            state.secondObject = payload
        },
        setSecondInnerObject: (state: ISampleSlice, { payload }: PayloadAction<ISecondInnerObject>) => {
            state.secondObject.secondInnerObject = payload
        },
        setSecondInnerObjectVarOne: (state: ISampleSlice, { payload }: PayloadAction<string>) => {
            state.secondObject.secondInnerObject.secondInnerObjectVarOne = payload
        },
        setSecondInnerObjectVarTwo: (state: ISampleSlice, { payload }: PayloadAction<string>) => {
            state.secondObject.secondInnerObject.secondInnerObjectVarTwo = payload
        },
        setSampleSlice: (state: ISampleSlice, { payload }: PayloadAction<ISampleSlice>) => {
            state.firstObject = payload.firstObject
            state.secondObject = payload.secondObject
        }
    }
});

export const getSampleSlice = (state: RootState) => state.sampleStore;
export const { 
    setFirstObject,
    setFirstObjectVar,
    setSecondObject,
    setSecondInnerObject,
    setSecondInnerObjectVarOne,
    setSecondInnerObjectVarTwo,
    setSampleSlice
} = sampleSlice.actions;