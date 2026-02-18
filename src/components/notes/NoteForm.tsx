import MDEditor from "@uiw/react-md-editor";
import { validateLength } from "../../utils/notes.ts";
import { useInput } from "../../hooks/useInput.ts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner.tsx";
import NoteButton from "./NoteButton.tsx";
import { addNote } from "../../store/slices/notes.ts";
import { api } from "../../config/api.ts";
import { useState } from "react";
import type { Note } from "../../types/notes.ts";
import type { ChangeEvent, SyntheticEvent } from "react";
import type { AppDispatch, RootState } from "../../store/store.ts";

interface NoteFormProps {
    note?: Note;
    isEditing?: boolean;
}

export default function NoteForm({ note, isEditing }: NoteFormProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.notes.singleNoteIsLoading);
    const error = useSelector((state: RootState) => state.notes.singleNoteError);

    // const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        value: titleValue,
        error: titleError,
        handleChange: handleTitleChange,
        handleTouch: handleTitleTouch,
    } = useInput<string>((value: string) => validateLength(value, 1, 255), note?.title || "");

    const {
        value: contentValue,
        error: contentError,
        handleChange: handleContentChange,
        handleTouch: handleContentTouch,
    } = useInput<string>((value: string) => validateLength(value, 1, 1000), note?.content || "");

    const handleSubmit= async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (titleValue.length > 0 && contentValue.length > 0) {
            if (isEditing) {
                try {
                    setIsSubmitting(true);
                    await api.put(`/notes/${note?.id}`, {
                        title: titleValue,
                        content: contentValue,
                    });
                    setIsSubmitting(false);
                    navigate('/notes');
                } catch (error) {
                    console.error(error);
                    setIsSubmitting(false);
                }
            } else {
                const resultAction = await dispatch(addNote({ title: titleValue, content: contentValue }));

                if (addNote.fulfilled.match(resultAction) && error.length === 0) {
                    navigate('/notes');
                }
            }
        }
    }

    let bottomErrorText = "";

    if (error) {
        bottomErrorText = error;
    } else if (contentError) {
        bottomErrorText = "Note content must be between 1 and 10000 characters";
    }

    return <form className="pt-7 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-3">
            <label htmlFor="note-title">
                Note title:
            </label>
            <input id="note-title" name="note-title" className="h-10 rounded-md bg-[#f7f7f7] p-4 border border-stone-700/60" type="text" value={titleValue} required
                   onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
                   onBlur={handleTitleTouch}
            />
            <span className={`text-red-500 ${titleError ? 'visible' : 'invisible'}`}>Title must be between 1 and 255 characters.</span>
        </div>
        <MDEditor
            value={contentValue}
            onChange={(value) => handleContentChange(value!)}
            onBlur={handleContentTouch}
        />
        <span className={`text-red-500 mt-4 ${bottomErrorText ? 'visible' : 'invisible'}`}>{bottomErrorText}</span>
        <NoteButton disabled={titleValue.length === 0 || contentValue.length === 0} className={`ml-auto flex gap-x-1 items-center ${titleValue.length === 0 || contentValue.length === 0 ? 'cursor-not-allowed!' : ''}`}>
            { isLoading && <Spinner className='text-stone-100 w-4 h-4' />}
            Submit
        </NoteButton>
    </form>
}