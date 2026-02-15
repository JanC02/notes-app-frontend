import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api.ts";
import axios from "axios";
import type { NoteResponse } from "../../types/notes.ts";

interface NotesState {
    allNotes: NoteResponse[];
    // notesStatus: SubmittingStatus;
    singleNoteIsLoading: boolean;
    singleNoteError: string;
}

interface SubmitNote {
    title: string;
    content: string;
}

const NotesState: NotesState = {
    allNotes: [],
    // notesStatus: null,
    singleNoteIsLoading: false,
    singleNoteError: '',
};

const notesSlice = createSlice({
    name: 'notes',
    initialState: NotesState,
    reducers: {
        resetNotesStatus(state) {
            // state.notesStatus = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNotes.pending, (state) => {
            // state.notesStatus = 'loading';
        })
        .addCase(getAllNotes.rejected, (state) => {
            // state.notesStatus = 'error';
        })
        .addCase(getAllNotes.fulfilled, (state, action) => {
            // state.notesStatus = null;
            state.allNotes = action.payload;
        })
        .addCase(addNote.pending, (state) => {
            state.singleNoteIsLoading = true;
            state.singleNoteError = '';
        })
        .addCase(addNote.rejected, (state, action) => {
            state.singleNoteIsLoading = false;
            state.singleNoteError = action.payload as string;
        })
        .addCase(addNote.fulfilled, (state) => {
            state.singleNoteIsLoading = false;
            state.singleNoteError = '';
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

export const addNote = createAsyncThunk(
    'notes/addNote',
    async ({ title, content }: SubmitNote, { rejectWithValue }) => {
        try {
            await api.post<NoteResponse>('/notes', {
                title,
                content,
            });
        } catch (error) {
            console.error(error);
            return rejectWithValue('An error has occurred, please try again');
        }
    }
);

export default notesSlice.reducer;
export const { resetNotesStatus } = notesSlice.actions;