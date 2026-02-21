import type { NoteResponse, NoteId, ParsedNoteResponse} from "../../types/notes.ts";
import { sortNotes } from "../../utils/sortNotes.ts";
import NoteListElement from "./NoteListElement.tsx";

interface NotesListProps {
    notes: NoteResponse[];
    onDelete: (id: NoteId) => void;
}

export default function NotesList({ notes, onDelete }: NotesListProps) {

    const parsedNotes: ParsedNoteResponse[] = notes.map(note => {
        return {
            ...note,
            createdAt: new Date(note.createdAt)
        }
    });
    const sortedNotes = sortNotes(parsedNotes);

    return <section className='grow flex flex-col'>
        <ul className="flex flex-col gap-y-4">
            {
                sortedNotes.map((note) => (
                    <NoteListElement key={note.id} id={note.id} title={note.title} createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`} onDelete={onDelete} />
                ))
            }
        </ul>
    </section>
}