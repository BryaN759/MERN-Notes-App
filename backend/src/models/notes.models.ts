import mongoose from 'mongoose';
import { NotesType } from '../shared/types';

export const notesSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true, unique: true },
        text: { type: String }
    },
    { timestamps: true }
);

const NoteModel = mongoose.model<NotesType>('Note', notesSchema);

export default NoteModel;
