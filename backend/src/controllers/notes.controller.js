import Note from "../models/Note.js"
import mongoose from 'mongoose';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId })
        res.status(200).json(notes);
    } catch (error) {
        console.log('Error in getNotes controller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Invalid note ID' });
        }
        const note = await Note.findOne({ _id: req.params.id, user: req.userId })
        if (!note) return res.status(404).json({ message: 'The note does not exist' })
        res.status(200).json(note);
    } catch (error) {
        console.log('Error in getNote controller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content, user: req.userId })
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.log('Error in createNote controller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Invalid note ID' });
        }
        const { title, content } = req.body
        const updatedNote = await Note.findOneAndUpdate({
            _id: req.params.id,
            user: req.userId
        },
            { title, content },
            { new: true })

        if (!updatedNote) return res.status(404).json({ message: 'The note does not exist' })
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log('Error in updateNote controller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Invalid note ID' });
        }
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId })

        if (!deletedNote) return res.status(404).json({ message: 'The note does not exist' })
        res.status(200).json(deletedNote);
    } catch (error) {
        console.log('Error in updateNote controller', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}