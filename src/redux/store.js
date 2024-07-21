import { configureStore } from "@reduxjs/toolkit";
import { api } from "./rtk";
import { myReducer } from "./reducer";


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [myReducer.name]: myReducer.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})