import type { ParsedNoteResponse } from "../types/notes.ts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import html2pdf from "html2pdf.js";

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

export async function exportNoteToPdf(title: string, content: string) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);

    const html = `<div class="wmde-markdown">${String(result)}</div>`;

    await html2pdf()
        .set({
            filename: `${title}.pdf`,
            margin: 10,
            image: { type: "jpeg", quality: 0.98 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(html)
        .save();
}