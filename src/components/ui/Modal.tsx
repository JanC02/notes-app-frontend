import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import NoteButton from "../notes/NoteButton.tsx";
import Spinner from "./Spinner.tsx";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;
}

export default function Modal({ open, onClose, onConfirm, title, message, isLoading }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [open]);

    return (
        createPortal(
            <dialog ref={dialogRef} onClose={onClose} className='text-[#404040] w-80 max-w-[calc(100%-2rem)] min-h-50 p-4 rounded-md flex flex-col backdrop:bg-linear-to-br backdrop:from-stone-100 backdrop:via-stone-200 backdrop:to-stone-300 backdrop:opacity-70'>
                <div className='flex justify-between w-full text-xl'>
                    <h2 className="font-semibold">{title}</h2>
                    <button onClick={onClose} className="text cursor-pointer hover:text-red-500">
                        x
                    </button>
                </div>
                <p className='mt-3 text-sm'>{message}</p>
                <div className='mt-auto ml-auto flex gap-x-3'>
                    <button onClick={onClose} className='cursor-pointer'>
                        Cancel
                    </button>
                    <NoteButton onClick={onConfirm} className='mb-0! px-3! flex gap-x-2' disabled={isLoading}>
                        { isLoading && <Spinner className='w-4 h-4 text-stone-100 mr-2' />}
                        OK
                    </NoteButton>
                </div>
            </dialog>,
            document.querySelector("#modal-root")!
        )
    )
}