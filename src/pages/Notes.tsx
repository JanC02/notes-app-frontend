import NotesList from "../components/notes/NotesList.tsx";
import { useNavigate } from "react-router-dom";
import NoteButton from "../components/notes/NoteButton.tsx";

export default function NotesPage() {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/notes/new");
    }

    return <>
        <div className='max-w-7xl mx-auto'>
            <NoteButton onClick={clickHandler}>
                + Add new note
            </NoteButton>
            <NotesList />
        </div>
    </>
}