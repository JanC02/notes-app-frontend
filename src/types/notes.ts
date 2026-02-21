export interface Note {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
}

export type NoteId = Note["id"];
export type NoteResponse = Omit<Note, 'userId' | 'content'>;
export type ParsedNoteResponse = Omit<NoteResponse, 'createdAt'> & { createdAt: Date };