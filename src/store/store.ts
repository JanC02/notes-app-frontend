import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import notesReducer from "./slices/notes";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: notesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;