import { type ReactNode, useEffect } from "react";
import { verifyToken } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store/store";

interface AuthProviderProps {
    children: ReactNode
};

export default function AuthProviderProps({ children }: AuthProviderProps) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(verifyToken());
        }
    }, [dispatch]);

    return <>
        {children}
    </>
}