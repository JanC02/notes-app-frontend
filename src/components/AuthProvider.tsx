import { type ReactNode, useEffect } from "react";
import { verifyToken } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import { tokenStorage } from "../config/api.ts";
import type { RefreshResponse } from "../types/api.ts";
import axios from "axios";

interface AuthProviderProps {
    children: ReactNode
};

export default function AuthProviderProps({ children }: AuthProviderProps) {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fn = async () => {
            try {
                const response = await axios.post<RefreshResponse>("/api/auth/refresh", undefined, {
                    withCredentials: true
                });
                tokenStorage.accessToken = response.data.accessToken;
                dispatch(verifyToken());
            } catch (error) {
                console.log(error);
            }
        }
        if (!user) {
            fn();
        }
    }, [dispatch]);

    return <>
        {children}
    </>
}