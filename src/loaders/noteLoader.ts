import type { LoaderFunctionArgs } from "react-router-dom";
import { api } from "../config/api.ts";
import type { Note } from "../types/notes.ts";

export async function noteLoader({ params }: LoaderFunctionArgs): Promise<Note | null> {
    try {
        const noteId = Number(params.id);

        if (isNaN(noteId)) {
            return null;
        }

        const result = await api.get<Note>(`/notes/${noteId}`);
        return result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}