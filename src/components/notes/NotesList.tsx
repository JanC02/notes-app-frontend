import type { RootState, AppDispatch } from "../../store/store.ts";
import type { ParsedNoteResponse } from "../../types/notes.ts";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../store/slices/notes.ts";
import { useEffect } from "react";
import { sortNotes } from "../../utils/sortNotes.ts";
import NoteListElement from "./NoteListElement.tsx";

export default function NotesList() {
    const dispatch = useDispatch<AppDispatch>();
    const notes = useSelector((state: RootState) => state.notes.allNotes);

    useEffect(() => {
         dispatch(getAllNotes());
    }, [dispatch]);

    const parsedNotes: ParsedNoteResponse[] = notes.map(note => {
        return {
            ...note,
            createdAt: new Date(note.createdAt)
        }
    });
    const sortedNotes = sortNotes(parsedNotes);

    return <section>
        <ul className="flex flex-col gap-y-4">
            {
                sortedNotes.map((note) => (
                    <NoteListElement key={note.id} title={note.title} createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`} />
                ))
            }
        </ul>
    </section>
}