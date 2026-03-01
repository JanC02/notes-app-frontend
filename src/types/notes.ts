export interface Note {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    isFavorite: boolean;
}

export type NoteId = Note["id"];
export type NoteResponse = Omit<Note, 'userId' | 'content'>;
export type ParsedNoteResponse = Omit<NoteResponse, 'createdAt'> & { createdAt: Date };

export type PaginatedNotes = {
    notes: NoteResponse[];
    totalPages: number;
};