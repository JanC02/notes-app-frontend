import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../store/slices/auth";
import { getAllNotes } from "../store/slices/notes.ts";
import type { AppDispatch, RootState } from "../store/store";

export default function NotesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const allNotes = useSelector((state: RootState) => state.notes.allNotes);

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    console.log(allNotes);

    return <div>
        Notes Page
        <button onClick={() => {dispatch(logout())}}>Logout</button>
    </div>
}