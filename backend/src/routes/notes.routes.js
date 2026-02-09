import express from 'express'
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controllers/notes.controller.js';


const notesRoutes = express.Router();

notesRoutes.get('/', getNotes)
notesRoutes.get('/:id', getNote)
notesRoutes.post('/', createNote)
notesRoutes.put('/:id', updateNote)
notesRoutes.delete('/:id', deleteNote)

export default notesRoutes;