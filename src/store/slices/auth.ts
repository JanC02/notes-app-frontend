import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import type { AuthResponse } from "../../types/api";
import axios from "axios";

interface User {
    id: number;
    email: string;
};

interface UserCredentials {
    email: string;
    password: string;
};

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string;
    isSessionVerificationPending: boolean;
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: '',
    isSessionVerificationPending: false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.user = {
                    id: action.payload.id,
                    email: action.payload.email
                };
                state.isLoading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error';
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = ''
            })
            .addCase(logout.rejected, (state, action) => {
                if (action.payload === 'Token is required') {
                    state.user = null;
                    state.isAuthenticated = false;
                    state.isLoading = false;
                    state.error = '';
                }
            })
            .addCase(verifySession.pending, (state) => {
                state.isSessionVerificationPending = true;
            })
            .addCase(verifySession.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isSessionVerificationPending = false;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = {
                    id: action.payload.id,
                    email: action.payload.email
                }
            })
            .addCase(verifySession.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = '';
                state.isSessionVerificationPending = false;
            })
    }
});

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: UserCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data?.message);
            }
            return rejectWithValue('An error has occurred. Please try again later.');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: UserCredentials, { rejectWithValue }) => {
        try {
            await api.post('/auth/register', credentials);
            return "Success";
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                return rejectWithValue("User with the same email address already exists.");
            }
            return rejectWithValue('An error has occurred. Please try again later.');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('An error has occurred. Please try again later.');
        }
    }
);

export const verifySession = createAsyncThunk(
    'auth/verifyToken',
    async () => {
        const response = await api.get<AuthResponse>('/users/me');
        return response.data;
    }
);

export default auth.reducer;
export const { clearError } = auth.actions;