import { type ReactNode, useEffect } from "react";
import { verifySession } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store/store";

interface AuthProviderProps {
    children: ReactNode
};

export default function AuthProviderProps({ children }: AuthProviderProps) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(verifySession());
    }, [dispatch]);

    return <>
        {children}
    </>
}