import { useNavigate } from "react-router-dom";
import type { NoteId } from "../../types/notes.ts";
import type { MouseEvent } from "react";

interface NoteListElementProps {
    id: NoteId
    title: string;
    createdAt: string;
    isFavorite: boolean;
    onSetModalVisible: (id: NoteId) => void;
    onSetFavorite: (id: NoteId, isFavorite: boolean) => Promise<void>;
}

export default function NoteListElement({ id, title, createdAt, isFavorite, onSetModalVisible, onSetFavorite }: NoteListElementProps) {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/notes/${id}`);
    }

    const deleteHandler = (e: MouseEvent) => {
        e.stopPropagation();
        onSetModalVisible(id);
    }

    const handleSetFavorite = (e: MouseEvent) => {
        e.stopPropagation();
        onSetFavorite(id, !isFavorite);
    }

    return <li onClick={clickHandler} className='flex p-4 shadow-xl rounded-md bg-[#f7f7f7] text-[#404040] border border-stone-200 cursor-pointer transition delay-50 hover:-translate-y-3'>
        <div className='grow flex flex-col gap-y-4 lg:gap-y-6 justify-between'>
            <div className='flex gap-x-2 items-center'>
                <button className='cursor-pointer' aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'} onClick={handleSetFavorite}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? '#404040' : 'none'} className={`transition-colors delay-100 hover:fill-[#404040]`} stroke="#404040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                </button>
                <h2 className='text-lg lg:text-xl'>{title}</h2>
            </div>
            <div className='flex gap-x-2'>
                <span className='text-xs'>
                    Last modified:
                </span>
                <span className='text-xs text-stone-400'>
                    {createdAt}
                </span>
            </div>
        </div>
        <button
            onClick={deleteHandler}
            className='self-start text-stone-400 hover:text-red-500 transition-colors cursor-pointer'
            aria-label='Delete note'
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
        </button>
    </li>
}