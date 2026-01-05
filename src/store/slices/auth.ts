import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import type { AuthResponse, VerifyTokenResponse } from "../../types/api";
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
    isTokenVerificationPending: boolean;
};

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,
    error: '',
    isTokenVerificationPending: false
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

                    localStorage.clear();
                }
            })
            .addCase(verifyToken.pending, (state) => {
                state.isTokenVerificationPending = true;
            })
            .addCase(verifyToken.fulfilled, (state) => {
                state.isTokenVerificationPending = false;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = '';
                state.isTokenVerificationPending = false;
                localStorage.clear();
            })
    }
});

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: UserCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);

            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

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
            await api.post('/auth/logout', {
                refreshToken: localStorage.getItem('refreshToken')
            });

            localStorage.clear();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('An error has occurred. Please try again later.');
        }
    }
);

export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async () => {
        const response = await api.get<VerifyTokenResponse>('/users/me');
        return response.data;
    }
);

export default auth.reducer;
export const { clearError } = auth.actions;