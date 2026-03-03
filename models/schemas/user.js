import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    resetToken: String,
    resetTokenExpiry: Date,
}
    , {
        timestamps: true,
    });