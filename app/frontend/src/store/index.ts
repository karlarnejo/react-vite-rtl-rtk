import { EnhancedStore, configureStore } from "@reduxjs/toolkit"
import { sampleSlice } from "./SampleSlice"

export const store: EnhancedStore = configureStore({
    reducer: {
      sampleStore: sampleSlice.reducer,
    },
})
  
export type RootState = ReturnType<typeof store.getState>