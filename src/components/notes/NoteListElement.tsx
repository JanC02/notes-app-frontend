import { useNavigate } from "react-router-dom";
import type { NoteId } from "../../types/notes.ts";

interface NoteListElementProps {
    id: NoteId
    title: string;
    createdAt: string;
}

export default function NoteListElement({ id, title, createdAt }: NoteListElementProps) {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/notes/${id}`);
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
    </li>
}