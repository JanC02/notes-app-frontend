import NotesList from "../components/notes/NotesList.tsx";
import { useNavigate } from "react-router-dom";
import NoteButton from "../components/notes/NoteButton.tsx";
import { useState, useEffect } from "react";
import Spinner from "../components/ui/Spinner.tsx";
import ErrorMessage from "../components/ui/ErrorMessage.tsx";
import type { NoteResponse, NoteId } from "../types/notes.ts";
import { api } from "../config/api.ts";

export default function NotesPage() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<NoteResponse[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await api.get<NoteResponse[]>('/notes');
                setNotes(res.data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchNotes();
    }, []);

    const handleDelete = async (id: NoteId) => {
        try {
            if (confirm("Are you sure you want to delete this note?")) {
                await api.delete(`/notes/${id}`);
                setNotes(prev => prev!.filter(note => note.id !== id));
            }
        } catch(error) {
            console.error(error)
        }
    };

    const handleSetIsFavorite = async (id: NoteId, isFavorite: boolean) => {
        try {
            await api.patch(`/notes/${id}`, {
                isFavorite,
            });
            setNotes(prev => prev?.map(note => {
                if (note.id !== id) {
                    return note;
                }
                return {
                    ...note,
                    isFavorite: isFavorite,
                }
            }) ?? null);
        } catch(error) {
            console.error(error)
        }
    };

    if (isLoading) return (
        <div className='grow flex justify-center items-center'>
            <Spinner className='text-[#404040] w-13 h-13' />
        </div>
    );

    if (error) return (
        <ErrorMessage message="An error occurred while fetching notes. Please try again." />
    );

    return <div className="w-full grow max-w-7xl mx-auto flex flex-col">
        <NoteButton onClick={() => navigate("/notes/new")}>
            + Add new note
        </NoteButton>
        <NotesList notes={notes!} onDelete={handleDelete} onSetFavorite={handleSetIsFavorite} />
    </div>
}
