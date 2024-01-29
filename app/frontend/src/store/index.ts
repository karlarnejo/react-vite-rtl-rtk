import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { sampleSlice } from './SampleSlice';
import { productSlice } from './ProductSlice';

export const store: EnhancedStore = configureStore({
    reducer: {
        sampleStore: sampleSlice.reducer,
        productStore: productSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
