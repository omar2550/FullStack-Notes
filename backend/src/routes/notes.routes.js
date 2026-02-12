import express from 'express'
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controllers/notes.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';


const notesRoutes = express.Router();

notesRoutes.get('/', verifyToken, getNotes)
notesRoutes.get('/:id', verifyToken, getNote)
notesRoutes.post('/', verifyToken, createNote)
notesRoutes.put('/:id', verifyToken, updateNote)
notesRoutes.delete('/:id', verifyToken, deleteNote)

export default notesRoutes;