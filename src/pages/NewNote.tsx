import NoteForm from "../components/notes/NoteForm.tsx";

export default function NewNote() {
    return (
        <div className="w-full max-w-384 mx-auto grow flex flex-col">
            <h2 className="font-semibold text-2xl">
                New note
            </h2>
            <NoteForm />
        </div>
    )
}