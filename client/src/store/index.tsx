import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import { apiSlice } from "./api/api-slice";
import profileSlice from "./profile-slice";
import modalSlice from "./modal-slice";
import addPostSlice from "./add-post-slice";

const rootReducer = {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    profile: profileSlice,
    modal: modalSlice,
    addPost: addPostSlice
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
export default store