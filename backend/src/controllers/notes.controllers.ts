import { NextFunction, Request, Response } from 'express';
import NoteModel from '../models/notes.models';
import mongoose from 'mongoose';

export const getNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.userId;
    try {
        const notes = await NoteModel.find({ userId });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error in getNotes controller:', error);
        res.status(500).json({
            message: 'Something when wrong while fetching notes'
        });
    }
};

export const addNote = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, text } = req.body;
    const userId = req.userId;
    try {
        if (!title || title.trim() === '') {
            return res
                .status(403)
                .json({ message: 'Please enter a title for the note!' });
        }

        const newNote = new NoteModel({
            userId: userId,
            title,
            text
        });
        await newNote.save();
        res.status(200).json(newNote);
    } catch (error) {
        console.error('Error in addNote controller:', error);
        res.status(500).json({
            message: 'Something when wrong while fetching notes'
        });
    }
};

export const updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const noteId = req.params.noteId;
    const { title: newTitle, text: newText } = req.body;
    const userId = req.userId;
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            return res.status(400).json({ message: 'Invalid note id' });
        }
        if (!newTitle || newTitle.trim() === '') {
            return res
                .status(403)
                .json({ message: 'Please enter a title for the note!' });
        }

        const note = await NoteModel.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found!' });
        }

        if (note.userId.toString() !== userId) {
            return res.status(401).json({
                message: 'Unauthorized: you cannot access this note!'
            });
        }

        note.title = newTitle;
        note.text = newText;

        await note.save();
        res.status(200).json(note);
    } catch (error) {
        console.error('Error in addNote controller:', error);
        res.status(500).json({
            message: 'Something when wrong while fetching notes'
        });
    }
};

export const deleteNote = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const noteId = req.params.noteId;
    const userId = req.userId;
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            return res.status(400).json({ message: 'Invalid note id' });
        }
        const note = await NoteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: 'Unauthorized - You cannot delete this note'
            });
        }

        await note.deleteOne();

        res.status(204).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error in deleteNote controller:', error);
        res.status(500).json({
            message: 'Something when wrong while fetching notes'
        });
    }
};

export const refreshCall = (req: Request, res: Response) => {
    console.log('Refresh request');
};
