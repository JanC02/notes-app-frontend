import { Navigate } from "react-router-dom";
import { useSelector} from "react-redux";
import type { RootState } from "../store/store"
import type { ReactNode } from "react";

interface UnprotectedRouterProps {
    children: ReactNode;
};

export default function UnprotectedRoute({ children }: UnprotectedRouterProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to='/notes' replace />
    }

    return <>
        {children}
    </>
}