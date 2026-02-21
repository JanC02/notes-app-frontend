import { useLoaderData } from "react-router-dom";
import NoteForm from "../components/notes/NoteForm.tsx";
import ErrorMessage from "../components/ui/ErrorMessage.tsx";
import type { Note } from "../types/notes.ts";

export default function EditNote() {
    const data = useLoaderData<Note | null>();

    return (
        <section className='flex flex-col grow w-full max-w-384 mx-auto'>
            { !data && <ErrorMessage message="Note not found" /> }
            { data && <NoteForm note={data} isEditing /> }
        </section>
    )
}