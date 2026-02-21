import { useNavigate } from "react-router-dom";
import type { NoteId } from "../../types/notes.ts";
import type { MouseEvent } from "react";

interface NoteListElementProps {
    id: NoteId
    title: string;
    createdAt: string;
    onDelete: (id: NoteId) => void;
}

export default function NoteListElement({ id, title, createdAt, onDelete }: NoteListElementProps) {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/notes/${id}`);
    }

    const deleteHandler = (e: MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
    }

    return <li onClick={clickHandler} className='flex p-4 shadow-xl rounded-md bg-[#f7f7f7] text-[#404040] border border-stone-200 cursor-pointer transition delay-50 hover:-translate-y-3'>
        <div className='grow flex flex-col gap-y-6 justify-between'>
            <h2 className='text-xl'>{title}</h2>
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