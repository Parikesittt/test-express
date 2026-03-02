import { User } from "../models/index.js";
import { connectDB } from "../db.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";

// REGISTER
export const register = async (req, res, next) => {
    try {
        await connectDB();

        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        return res.status(201).json({
            message: "Register successful",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
            },
        });
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        await connectDB();

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        return res.json({
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (err) {
        next(err);
    }
};