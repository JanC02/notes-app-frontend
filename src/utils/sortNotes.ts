import type { ParsedNoteResponse } from "../types/notes.ts";

export function sortNotes(notes: ParsedNoteResponse[]) {
    return notes.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
}