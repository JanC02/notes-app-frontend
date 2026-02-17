import NotesList from "../components/notes/NotesList.tsx";
import { useNavigate } from "react-router-dom";
import NoteButton from "../components/notes/NoteButton.tsx";

export default function NotesPage() {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/notes/new");
    }

    return <>
        <div className='w-full grow max-w-7xl mx-auto flex flex-col'>
            <NoteButton onClick={clickHandler}>
                + Add new note
            </NoteButton>
            <NotesList />
        </div>
    </>
}