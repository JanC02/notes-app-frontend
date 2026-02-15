import NoteForm from "../components/notes/NoteForm.tsx";

export default function NewNote() {
    return (
        <div className="max-w-384 mx-auto">
            <h2 className="font-semibold text-2xl">
                New note
            </h2>
            <NoteForm />
        </div>
    )
}