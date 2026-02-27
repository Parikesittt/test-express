import { Schema } from "mongoose";

export const PostSchema = new Schema({
    title: String,
    content: String,
    author: String,

}, {
    timestamps: true,
});