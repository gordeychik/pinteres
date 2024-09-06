import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice';
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        favorite: favoriteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;