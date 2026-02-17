import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api.ts";
import type { NoteResponse } from "../../types/notes.ts";

interface NotesState {
    allNotes: NoteResponse[];
    notesLoading: boolean;
    notesError: string;
    singleNoteIsLoading: boolean;
    singleNoteError: string;
}

interface SubmitNote {
    title: string;
    content: string;
}

const NotesState: NotesState = {
    allNotes: [],
    notesLoading: false,
    notesError: '',
    singleNoteIsLoading: false,
    singleNoteError: '',
};

const notesSlice = createSlice({
    name: 'notes',
    initialState: NotesState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllNotes.pending, (state) => {
            state.notesLoading = true;
            state.notesError = '';
        })
        .addCase(getAllNotes.rejected, (state, action) => {
            state.notesLoading = false;
            state.notesError = action.payload as string;
        })
        .addCase(getAllNotes.fulfilled, (state, action) => {
            state.notesLoading = false;
            state.notesError = '';
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
    async (_, { rejectWithValue }) => {
        try {
            const result = await api.get<NoteResponse[]>('/notes');
            return result.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('An error occurred while getting notes. Please try again.');
        }
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