import {Outlet, useNavigation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth.ts";
import type { AppDispatch } from "../../store/store.ts";
import Spinner from "../ui/Spinner.tsx";

export default function NotesLayout() {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    const navigation = useNavigation();

    const isLoadingNotes = navigation.state === "loading" &&
        navigation.location?.pathname === "/notes";

    return <>
        <header className='sticky top-0 min-h-11 lg:min-h-13 flex items-center justify-between gap-x-4 px-4 bg-emerald-500 shadow-[0_4px_16px_rgba(0,0,0,0.35)] text-[#f7f7f7]'>
            <h1 className='font-semibold text-2xl lg:text-3xl'>Notes</h1>
            <button onClick={handleLogout} className='cursor-pointer transition-colors ease-out delay-50 hover:text-[#404040] hover'>Logout</button>
        </header>
        <main className='flex flex-col min-h-[calc(100vh-2.75rem)] lg:min-h-[calc(100vh-3.25rem)] bg-linear-to-br from-stone-100 via-stone-200 to-stone-300 p-4'>
            {
                isLoadingNotes ?
                    <div className='grow flex justify-center items-center'>
                        <Spinner className='text-[#404040] w-13 h-13' />
                    </div>
                    : <Outlet />
            }
        </main>
    </>
}