import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth.ts";
import type { AppDispatch } from "../../store/store.ts";

export default function NotesLayout() {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    return <>
        <header className='min-h-13 flex items-center justify-between gap-x-4 px-4 bg-emerald-500 shadow-2xl text-[#f7f7f7]'>
            <h1 className='font-semibold text-3xl'>Notes</h1>
            <button onClick={handleLogout} className='cursor-pointer transition-colors ease-out delay-50 hover:text-[#404040] hover'>Logout</button>
        </header>
        <main className='min-h-[calc(100vh-3.25rem)] bg-linear-to-br from-stone-100 via-stone-200 to-stone-300 p-4'>
            <Outlet />
        </main>
    </>
}