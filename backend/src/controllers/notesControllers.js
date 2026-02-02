import Note from "../models/Note.js"
import mongoose from 'mongoose';

export const getNotes = async (_, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes);
    } catch (error) {
        console.log('Error in getNotes conntroller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Invalid note ID' });
        }
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: 'The note does not exist' })
        res.status(200).json(note);
    } catch (error) {
        console.log('Error in getNote conntroller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.log('Error in createNote conntroller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Invalid note ID' });
        }
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) return res.status(404).json({ message: 'The note does not exist' })
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log('Error in updateNote conntroller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Invalid note ID' });
        }
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: 'The note does not exist' })
        res.status(200).json(deletedNote);
    } catch (error) {
        console.log('Error in updateNote conntroller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}