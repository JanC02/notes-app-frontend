interface NoteListElementProps {
    title: string;
    createdAt: string;
}

export default function NoteListElement({ title, createdAt }: NoteListElementProps) {
    return <li className='flex p-4 shadow-xl rounded-md bg-[#f7f7f7] text-[#404040] border border-stone-200'>
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