import express from 'express';
import * as Controllers from '../controllers/notes.controllers';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// /api/notes

router.get('/', authMiddleware, Controllers.getNotes);

router.post('/', authMiddleware, Controllers.addNote);

router.patch('/:noteId', authMiddleware, Controllers.updateNote);

router.delete('/:noteId', authMiddleware, Controllers.deleteNote);

router.get('/refresh', Controllers.refreshCall);

export default router;
