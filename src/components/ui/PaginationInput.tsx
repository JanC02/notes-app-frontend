import {type ChangeEvent, useState} from "react";
import ChevronIcon from "./ChevronIcon.tsx";

interface PaginationInputProps {
    page: number;
    maxPage: number;
    onPageChange: (page: number) => void
}

export default function PaginationInput({page, maxPage, onPageChange}: PaginationInputProps) {
    const [inputValue, setInputValue] = useState(page);

    const changePage = (page: number) => {
        if (isNaN(page)) {
            return;
        }
        if (page > maxPage) {
            setInputValue(maxPage);
            onPageChange(maxPage);
            return;
        }
        if (page < 1) {
            setInputValue(1);
            onPageChange(1);
            return;
        }
        setInputValue(page);
        onPageChange(page);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value);
        changePage(number);
    }

    const onClickHandler = (newPage: number) => {
        changePage(newPage);
    }

    return (
        <div className="flex gap-2 items-center">
            <button className="cursor-pointer disabled:opacity-40" onClick={() => onClickHandler(page - 1)}
                    disabled={page <= 1}>
                <ChevronIcon direction="left" className="w-5 h-5 text-emerald-500"/>
            </button>
            <input
                className="w-16 text-center border border-stone-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoComplete="off" min={1} max={maxPage}
                type="number" id="page-number" name="page-number" value={inputValue} onChange={onChangeHandler}/>
            <button className="cursor-pointer disabled:opacity-40" onClick={() => onClickHandler(page + 1)}
                    disabled={page >= maxPage}>
                <ChevronIcon direction="right" className="w-5 h-5 text-emerald-500"/>
            </button>
        </div>
    )
}