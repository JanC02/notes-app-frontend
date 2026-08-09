import { type ReactNode, useEffect } from "react";
import { verifySession } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import Spinner from "./ui/Spinner";

interface AuthProviderProps {
    children: ReactNode
};

export default function AuthProviderProps({ children }: AuthProviderProps) {
    const isVerificationPending = useSelector((state: RootState) => state.auth.isSessionVerificationPending);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(verifySession());
    }, [dispatch]);

    return <>
        {
            isVerificationPending ?
                <div className="h-screen flex justify-center items-center">
                    <Spinner className='text-[#404040] w-13 h-13' />
                </div> : children
        }
    </>
}