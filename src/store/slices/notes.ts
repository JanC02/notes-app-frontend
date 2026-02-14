import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api.ts";
import type { NoteResponse } from "../../types/notes.ts";

type NotesStatus = null | 'loading' | 'error';

interface NotesState {
    allNotes: NoteResponse[];
    noteStatus: NotesStatus | null;
}

const NotesState: NotesState = {
    allNotes: [],
    noteStatus: null
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: NotesState,
    reducers: {
        resetNotesStatus(state) {
            state.noteStatus = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNotes.pending, (state) => {
            state.noteStatus = 'loading';
        })
        .addCase(getAllNotes.rejected, (state) => {
            state.noteStatus = 'error';
        })
        .addCase(getAllNotes.fulfilled, (state, action) => {
            state.noteStatus = null;
            state.allNotes = action.payload;
        })
    }
});

export const getAllNotes = createAsyncThunk(
    'notes/getAllNotes',
    async () => {
        const result = await api.get<NoteResponse[]>('/notes');
        return result.data;
    }
);

export default notesSlice.reducer;
export const { resetNotesStatus } = notesSlice.actions;