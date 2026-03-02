import { Router } from "express";
import * as Note from '../models/note.js';
import { Post } from "../models/index.js";
import { connectDB } from "../db.js";
import passport from "passport";

const router = Router();

// router.get('/', (req, res) => {
//     const notes = Note.list();
//     res.json(notes);
// });
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await connectDB();
        const notes = await Post.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await connectDB();

        const note = await Post.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        next(err);
    }
});
// router.get('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     try {
//         const note = Note.get(id);
//         res.json(note);
//     } catch (err) {
//         next(err);
//     }
// });

// router.post('/', (req, res) => {
//     const { title, content } = req.body;
//     const newNote = Note.create(title, content);
//     res.status(201).json(newNote);
// });
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        res.status(400).json({ error: 'Title, content, and author are required' });
        return;
    }
    try {
        await connectDB();

        const note = await Post.create({ title: title, content: content, author: author });
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        await connectDB();

        const updatedNote = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (err) {
        next(err);
    }
});
// router.put('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const { title, content } = req.body;
//     try {
//         const updatedNote = Note.update(id, title, content);
//         res.json(updatedNote);
//     } catch (err) {
//         next(err);
//     }
// });

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await connectDB();

        const note = await Post.findByIdAndDelete(id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// router.delete('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     try {
//         Note.remove(id);
//         res.status(204).send();
//     } catch (err) {
//         next(err);
//     }
// });

export default router;