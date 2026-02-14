export interface Note {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: Date;
}

export type NoteResponse = Omit<Note, 'userId' | 'content'>;