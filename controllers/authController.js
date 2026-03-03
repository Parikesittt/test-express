import { User } from "../models/index.js";
import { connectDB } from "../db.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js";
import { generateResetToken } from "../utils/hash.js";

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

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.json({
            message: "Login successful",
            token: token,
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

export const requestReset = async (req, res, next) => {
    const { email } = req.body;
    try {
        await connectDB();
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + + 1000 * 60 * 15;
        await user.save();
        // Kirim email dengan resetToken (gunakan nodemailer atau layanan email lainnya)
        const resetLink = `http://express.pkesitt.my.id/reset-password/${resetToken}`;
        await sendEmail(
            email,
            "Reset Password",
            `<a href="${resetLink}">Click here to reset password</a>`
        );

        res.json({ message: "Password reset link generated. Please check your email." });
    } catch (err) {
        next(err);
    }
}

export const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        await connectDB();
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = hashPassword(newPassword);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        res.json({ message: "Password reset successful" });
    } catch (err) {
        next(err);
    }
}