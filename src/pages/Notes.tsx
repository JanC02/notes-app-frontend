import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logout } from "../store/slices/auth";

export default function NotesPage() {
    const dispatch = useDispatch<AppDispatch>();

    return <div>
        Notes Page
        <button onClick={() => {dispatch(logout())}}>Logout</button>
    </div>
}