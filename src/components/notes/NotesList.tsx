import type { RootState, AppDispatch } from "../../store/store.ts";
import type { ParsedNoteResponse } from "../../types/notes.ts";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../store/slices/notes.ts";
import { useEffect } from "react";
import { sortNotes } from "../../utils/sortNotes.ts";
import NoteListElement from "./NoteListElement.tsx";
import Spinner from "../ui/Spinner.tsx";
import ErrorMessage from "../ui/ErrorMessage.tsx";

export default function NotesList() {
    const dispatch = useDispatch<AppDispatch>();
    const notes = useSelector((state: RootState) => state.notes.allNotes);
    const isLoading = useSelector((state: RootState) => state.notes.notesLoading);
    const error = useSelector((state: RootState) => state.notes.notesError);

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

    return <section className='grow flex flex-col'>
        {isLoading && !error && <div className='grow flex justify-center items-center'>
            <Spinner className='text-[#404040] w-13 h-13' />
        </div>}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && <ul className="flex flex-col gap-y-4">
            {
                sortedNotes.map((note) => (
                    <NoteListElement key={note.id} id={note.id} title={note.title} createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`} />
                ))
            }
        </ul>}
    </section>
}