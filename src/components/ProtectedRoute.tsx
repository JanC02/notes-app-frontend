import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store"
import type { ReactNode } from "react";

interface ProtectedRouterProps {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouterProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isTokenVerificationPending = useSelector((state: RootState) => state.auth.isTokenVerificationPending);

    if (isTokenVerificationPending) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    return <>
        {children}
    </>
}