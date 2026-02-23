import type {ReactNode} from "react";

interface NoteButtonProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    children: ReactNode;
}

export default function NoteButton({children, className, onClick, disabled}: NoteButtonProps) {
    return <button disabled={disabled}
                   className={`bg-emerald-500 text-[#f7f7f7] text-sm lg:text-base mb-4 p-1.5 lg:p-2 rounded-md transition delay-50 hover:bg-emerald-600 cursor-pointer ${className ?? ''} disabled:bg-emerald-500/70 disabled:cursor-not-allowed w-fit`}
                   onClick={onClick}>
        {children}
    </button>
}