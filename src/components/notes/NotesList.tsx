import type {NoteResponse, NoteId, ParsedNoteResponse} from "../../types/notes.ts";
import {sortNotes} from "../../utils/sortNotes.ts";
import {filterFavoriteNotes} from "../../utils/notes.ts";
import NoteListElement from "./NoteListElement.tsx";

interface NotesListProps {
    notes: NoteResponse[];
    onDelete: (id: NoteId) => void;
    onSetFavorite: (id: NoteId, isFavorite: boolean) => Promise<void>;
}

export default function NotesList({notes, onDelete, onSetFavorite}: NotesListProps) {
    const parsedNotes: ParsedNoteResponse[] = notes.map(note => {
        return {
            ...note,
            createdAt: new Date(note.createdAt)
        }
    });
    const sortedNotes = sortNotes(parsedNotes);

    const {favoriteNotes, unfavoriteNotes} = filterFavoriteNotes(sortedNotes);

    return <section className='grow flex flex-col'>
        {favoriteNotes.length > 0 && <>
            <ul className="flex flex-col gap-y-4 mb-3">
                {
                    favoriteNotes.map((note) => (
                        <NoteListElement key={note.id} id={note.id} title={note.title}
                                         createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`}
                                         onDelete={onDelete} isFavorite={true}
                                         onSetFavorite={onSetFavorite}/>
                    ))
                }
            </ul>
            <div aria-hidden="true" className="w-98/100 mx-auto mb-3 border-b border-b-stone-400" />
        </>}
        <ul className="flex flex-col gap-y-4">
            {
                unfavoriteNotes.map((note) => (
                    <NoteListElement key={note.id} id={note.id} title={note.title}
                                     createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`}
                                     onDelete={onDelete} isFavorite={false}
                                     onSetFavorite={onSetFavorite}/>
                ))
            }
        </ul>
    </section>
}