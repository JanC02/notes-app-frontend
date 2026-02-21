import NoteForm from "../components/notes/NoteForm.tsx";

export default function NewNote() {
    return (
        <div className="w-full max-w-384 mx-auto grow flex flex-col">
            <NoteForm />
        </div>
    )
}