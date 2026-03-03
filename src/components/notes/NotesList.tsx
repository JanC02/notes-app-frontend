import type {NoteResponse, NoteId, ParsedNoteResponse} from "../../types/notes.ts";
import {filterFavoriteNotes} from "../../utils/notes.ts";
import NoteListElement from "./NoteListElement.tsx";

interface NotesListProps {
    notes: NoteResponse[];
    onSetModalVisible: (id: NoteId) => void;
    onSetFavorite: (id: NoteId, isFavorite: boolean) => Promise<void>;
    page: number;
}

export default function NotesList({notes, onSetModalVisible, onSetFavorite, page}: NotesListProps) {
    const parsedNotes: ParsedNoteResponse[] = notes.map(note => {
        return {
            ...note,
            createdAt: new Date(note.createdAt)
        }
    });

    const {favoriteNotes, unfavoriteNotes} = filterFavoriteNotes(parsedNotes);

    const everyFav = notes.every(note => note.isFavorite);

    return <section className={`grow flex flex-col ${notes.length === 0 ? 'items-center justify-center' : ''}`}>
        {notes.length > 0 ? <>
            {favoriteNotes.length > 0 && <>
                <ul className="flex flex-col gap-y-4 mb-3">
                    {
                        favoriteNotes.map((note) => (
                            <NoteListElement key={note.id} id={note.id} title={note.title}
                                             createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`}
                                             onSetModalVisible={onSetModalVisible} isFavorite={true}
                                             onSetFavorite={onSetFavorite} page={page} />
                        ))
                    }
                </ul>
                {!everyFav && <div aria-hidden="true" className="w-98/100 mx-auto mb-3 border-b border-b-stone-400" />}
            </>}
            <ul className="flex flex-col gap-y-4">
                {
                    unfavoriteNotes.map((note) => (
                        <NoteListElement key={note.id} id={note.id} title={note.title}
                                         createdAt={`${note.createdAt.toLocaleTimeString('en-us')} ${note.createdAt.toLocaleDateString('en-us')}`}
                                         onSetModalVisible={onSetModalVisible} isFavorite={false}
                                         onSetFavorite={onSetFavorite} page={page} />
                    ))
                }
            </ul>
        </> : <p className="w-full h-full flex items-center justify-center text-[#404040]">
            It's empty here! Start by creating your first note.
        </p>}

    </section>
}