import NotesList from "../components/notes/NotesList.tsx";
import {useNavigate} from "react-router-dom";
import NoteButton from "../components/notes/NoteButton.tsx";
import {useState, useEffect} from "react";
import Spinner from "../components/ui/Spinner.tsx";
import ErrorMessage from "../components/ui/ErrorMessage.tsx";
import type {PaginatedNotes, NoteId} from "../types/notes.ts";
import {api} from "../config/api.ts";
import Modal from "../components/ui/Modal.tsx";
import { showNotification } from "../store/slices/notification.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";

export default function NotesPage() {
    const navigate = useNavigate();
    const [notesData, setNotesData] = useState<PaginatedNotes | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<NoteId | null>(null);
    const [isDeletingNote, setIsDeletingNote] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await api.get<PaginatedNotes>('/notes');
                setNotesData(res.data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchNotes();
    }, []);

    const handleDelete = async () => {
        if (!noteToDelete) {
            return;
        }
        try {
            setIsDeletingNote(true);
            await api.delete(`/notes/${noteToDelete}`);
            setNotesData(prev => {
                if (!prev) {
                    return null;
                }
                return {
                    ...prev,
                    notes: prev.notes.filter(note => note.id !== noteToDelete)
                }
            });
            setIsDeletingNote(false);
            setNoteToDelete(null);
            dispatch(showNotification('Note has been deleted. ', 'success'));
        } catch (error) {
            console.error(error);
            setIsDeletingNote(false);
            setNoteToDelete(null);
            dispatch(showNotification('An error has occurred. Please try again.', 'error'));
        }
    };

    const handleSetIsFavorite = async (id: NoteId, isFavorite: boolean) => {
        try {
            await api.patch(`/notes/${id}`, {
                isFavorite,
            });
            setNotesData(prev => {
                if (!prev) {
                    return null;
                }
                return {
                    ...prev,
                    notes: prev.notes.map(note => {
                        if (note.id !== id) {
                            return note;
                        }
                        return {
                            ...note,
                            isFavorite: isFavorite,
                        }
                    }),
                }
            });
        } catch (error) {
            console.error(error);
            dispatch(showNotification('An error has occurred. Please try again.', 'error'));
        }
    };

    const handleSetModalVisible = (id: NoteId) => {
        setNoteToDelete(id);
    };

    const handleSetModalNotVisible = () => {
        setNoteToDelete(null);
        setIsDeletingNote(false);
    };

    if (isLoading) return (
        <div className='grow flex justify-center items-center'>
            <Spinner className='text-[#404040] w-13 h-13'/>
        </div>
    );

    if (error)
        return (
            <ErrorMessage message="An error occurred while fetching notes. Please try again."/>
        );

    return <div className="w-full grow max-w-7xl mx-auto flex flex-col">
        <NoteButton onClick={() => navigate("/notes/new")}>
            + Add new note
        </NoteButton>
        {notesData && <NotesList notes={notesData.notes} onSetModalVisible={handleSetModalVisible} onSetFavorite={handleSetIsFavorite}/>}
        {!!noteToDelete && <Modal title="Are you sure?" message="Are you sure you want to delete this note?" open={!!noteToDelete} onConfirm={handleDelete}
               onClose={handleSetModalNotVisible} isLoading={isDeletingNote}/>}
    </div>
}
