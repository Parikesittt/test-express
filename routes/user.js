import { Router } from "express";
import { User } from "../models/index.js";
import { connectDB } from "../db.js";
import crypto from "crypto";
import { hashPassword, verifyPassword } from "../utils/hash.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }
    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = verifyPassword(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }
        res.json({ message: "Login successful", data: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post('/register', async (req, res) => {
    const { name, password, email, phone } = req.body;
    if (!name || !password || !email || !phone) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    try {
        await connectDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email already in use' });
            return;
        }
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({ name, password: hashedPassword, email, phone });
        res.status(201).json({ message: "Register successful", data: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
