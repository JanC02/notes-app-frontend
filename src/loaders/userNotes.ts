import type { NoteResponse } from "../types/notes.ts";
import { api } from "../config/api.ts";

export async function userNotesLoader(): Promise<NoteResponse[] | null> {
    const result = await api.get<NoteResponse[]>('/notes');
    await new Promise(resolve => setTimeout(resolve, 10000));
    return result.data;
}