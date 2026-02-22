import type { ParsedNoteResponse } from "../types/notes.ts";

export function validateLength(value: string, min: number, max: number) {
    return value.length >= min && value.length <= max;
}

export function filterFavoriteNotes(notes: ParsedNoteResponse[]) {
    const favoriteNotes: ParsedNoteResponse[] = [];
    const unfavoriteNotes: ParsedNoteResponse[] = [];

    for (const note of notes) {
        if (note.isFavorite) {
            favoriteNotes.push(note);
        } else {
            unfavoriteNotes.push(note);
        }
    }

    return {
        favoriteNotes,
        unfavoriteNotes
    };
}